import { useState, useEffect } from "react";
import { userService, type User } from "@/services/userService";

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  points: number;
  position?: number;
}

export interface TeamWithMembers {
  id: string;
  name: string;
  totalPoints: number;
  members: TeamMember[];
  isActive?: boolean;
}

export function useTeams() {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const users = await userService.getAll();
        
        const teamMap = new Map<string, TeamWithMembers>();
        
        users.forEach(user => {
          if (!user.team) return;
          
          const teamId = user.team.id;
          
          if (!teamMap.has(teamId)) {
            teamMap.set(teamId, {
              id: teamId,
              name: user.team.name,
              totalPoints: 0,
              members: [],
              isActive: user.team.isActive
            });
          }
          
          const team = teamMap.get(teamId)!;
          
          team.members.push({
            id: user.id,
            name: user.name,
            avatar: getAvatarUrl(user),
            points: user.points
          });
          
          team.totalPoints += user.points;
        });
        
        const teamsArray = Array.from(teamMap.values());
        teamsArray.sort((a, b) => b.totalPoints - a.totalPoints);
        
        teamsArray.forEach(team => {
          team.members.sort((a, b) => b.points - a.points);
          team.members.forEach((member, index) => {
            member.position = index + 1;
          });
        });
        
        setTeams(teamsArray);
      } catch (err) {
        console.error("Erro carregando times:", err);
        setError("Falha ao carregar dados dos times");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  function getAvatarUrl(user: User): string {
    return `/avatars/${user.username}.jpg`;
  }

  return { teams, loading, error };
}