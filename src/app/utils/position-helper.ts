import { careersData } from '@/app/data/careers/full-time';
import { internshipPositions } from '@/app/data/careers/internship';

// Helper function to get position name from ID
export function getPositionNameById(id: string): string {
  const numId = parseInt(id, 10);

  // Check if it's a full-time position
  const fullTimePosition = careersData.positions.find((pos) => pos.id === numId);
  if (fullTimePosition) {
    return `${fullTimePosition.title}${fullTimePosition.subtitle ? ` (${fullTimePosition.subtitle})` : ''}`;
  }

  // Check if it's an internship position (IDs start from 1000)
  if (numId >= 1000) {
    const internshipIndex = numId - 1000;
    if (internshipIndex >= 0 && internshipIndex < internshipPositions.length) {
      return `${internshipPositions[internshipIndex].title} (Internship)`;
    }
  }

  // Fallback if position not found
  return `Position ID: ${id}`;
}
