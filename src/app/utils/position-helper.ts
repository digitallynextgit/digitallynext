import {
  CAREERS_DEPARTMENTS,
  CAREERS_INTERNSHIP_DEPARTMENTS,
} from '@/data/careersDepartments';

// Helper function to get position name from a role ID
export function getPositionNameById(id: string): string {
  for (const department of CAREERS_DEPARTMENTS) {
    const role = department.roles.find((pos) => pos.id === id);
    if (role) {
      return role.title;
    }
  }

  for (const department of CAREERS_INTERNSHIP_DEPARTMENTS) {
    const role = department.roles.find((pos) => pos.id === id);
    if (role) {
      return `${role.title} (Internship)`;
    }
  }

  return `Position ID: ${id}`;
}
