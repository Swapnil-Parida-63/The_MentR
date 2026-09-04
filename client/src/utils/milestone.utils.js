/**
 * @file milestone.utils.js
 * @description Milestone calculation, crown badges, and progress bar utilities for TheMentR Verified Teachers.
 */

export const MILESTONES = [
  {
    id: 'starter',
    level: 'MentR Starter',
    minHours: 0,
    maxHours: 99,
    crown: '🌱',
    badgeName: 'Starter',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    title: 'Teacher begins journey',
    desc: 'Teacher begins journey on TheMentR platform.'
  },
  {
    id: 'bronze',
    level: 'Bronze Crown',
    minHours: 100,
    maxHours: 249,
    crown: '🥉',
    badgeName: 'Bronze Crown',
    color: '#CD7F32',
    bgColor: 'rgba(205, 127, 50, 0.12)',
    borderColor: 'rgba(205, 127, 50, 0.35)',
    title: 'First major milestone',
    desc: 'Recognized for reaching the first major milestone of 100+ teaching hours.'
  },
  {
    id: 'silver',
    level: 'Silver Crown',
    minHours: 250,
    maxHours: 499,
    crown: '🥈',
    badgeName: 'Silver Crown',
    color: '#64748B',
    bgColor: 'rgba(100, 116, 139, 0.12)',
    borderColor: 'rgba(100, 116, 139, 0.35)',
    title: 'Consistent Mentor',
    desc: 'Recognized as a Consistent Mentor for completing 250+ dedicated teaching hours.'
  },
  {
    id: 'gold',
    level: 'Gold Crown',
    minHours: 500,
    maxHours: 749,
    crown: '🥇',
    badgeName: 'Gold Crown',
    color: '#EAB308',
    bgColor: 'rgba(234, 179, 8, 0.14)',
    borderColor: 'rgba(234, 179, 8, 0.4)',
    title: 'Experienced Mentor',
    desc: 'Recognized as an Experienced Mentor for 500+ hours of transforming student learning outcomes.'
  },
  {
    id: 'platinum',
    level: 'Platinum Crown',
    minHours: 750,
    maxHours: 999,
    crown: '💎',
    badgeName: 'Platinum Crown',
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.12)',
    borderColor: 'rgba(6, 182, 212, 0.35)',
    title: 'Elite Mentor',
    desc: 'Recognized as an Elite Mentor for crossing 750+ hours of stellar academic dedication.'
  },
  {
    id: 'diamond',
    level: 'Diamond Crown',
    minHours: 1000,
    maxHours: 2499,
    crown: '🔷',
    badgeName: 'Diamond Crown',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.14)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    title: 'Master Mentor',
    desc: 'Recognized as a Master Mentor for delivering over 1,000+ hours of master-level pedagogy.'
  },
  {
    id: 'royal',
    level: 'Royal Crown',
    minHours: 2500,
    maxHours: 4999,
    crown: '👑',
    badgeName: 'Royal Crown',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.14)',
    borderColor: 'rgba(139, 92, 246, 0.4)',
    title: 'Exceptional contribution',
    desc: 'Recognized for 2,500+ hours of extraordinary leadership and foundational contribution.'
  },
  {
    id: 'legend',
    level: 'MentR Legend',
    minHours: 5000,
    maxHours: Infinity,
    crown: '🏆',
    badgeName: 'Legend Crown',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.16)',
    borderColor: 'rgba(245, 158, 11, 0.5)',
    title: 'Lifetime-level recognition',
    desc: 'Honored with Lifetime MentR Legend status for 5,000+ hours of unmatched educational legacy.'
  }
];

export const PROGRESS_NODES = [
  { hours: 100, label: '100h', crown: '🥉', name: 'Bronze Crown', title: 'First Major Milestone', desc: 'Recognized for reaching the first major milestone of 100+ teaching hours.' },
  { hours: 250, label: '250h', crown: '🥈', name: 'Silver Crown', title: 'Consistent Mentor', desc: 'Recognized as a Consistent Mentor for completing 250+ dedicated teaching hours.' },
  { hours: 500, label: '500h', crown: '🥇', name: 'Gold Crown', title: 'Experienced Mentor', desc: 'Recognized as an Experienced Mentor for 500+ hours of transforming student learning outcomes.' },
  { hours: 750, label: '750h', crown: '💎', name: 'Platinum Crown', title: 'Elite Mentor', desc: 'Recognized as an Elite Mentor for crossing 750+ hours of stellar academic dedication.' },
  { hours: 1000, label: '1,000h', crown: '🔷', name: 'Diamond Crown', title: 'Master Mentor', desc: 'Recognized as a Master Mentor for delivering over 1,000+ hours of master-level pedagogy.' },
  { hours: 2500, label: '2,500h', crown: '👑', name: 'Royal Crown', title: 'Exceptional Contribution', desc: 'Recognized for 2,500+ hours of extraordinary leadership and foundational contribution.' },
  { hours: 5000, label: '5,000h', crown: '🏆', name: 'Legend Crown', title: 'Lifetime Educational Legacy', desc: 'Honored with Lifetime MentR Legend status for 5,000+ hours of unmatched educational legacy.' }
];

/**
 * Calculates current milestone stats for a given teaching hours value.
 * @param {number} hours 
 */
export function getTeacherMilestone(hours = 0) {
  const current = MILESTONES.find(m => hours >= m.minHours && hours <= m.maxHours) || MILESTONES[0];
  const currentIndex = MILESTONES.findIndex(m => m.id === current.id);
  const next = MILESTONES[currentIndex + 1] || null;

  let progressPercent = 100;
  let hoursToNext = 0;

  if (next) {
    const range = next.minHours - current.minHours;
    const progressInTier = hours - current.minHours;
    progressPercent = Math.min(100, Math.max(0, Math.round((progressInTier / range) * 100)));
    hoursToNext = next.minHours - hours;
  }

  // Calculate overall timeline fill percentage (0 to 100 across 100h to 5000h nodes)
  const minTimeline = 100;
  const maxTimeline = 5000;
  let timelineFillPercent = 0;
  if (hours <= minTimeline) {
    timelineFillPercent = Math.max(0, (hours / minTimeline) * 14.28);
  } else if (hours >= maxTimeline) {
    timelineFillPercent = 100;
  } else {
    for (let i = 0; i < PROGRESS_NODES.length - 1; i++) {
      const nodeA = PROGRESS_NODES[i];
      const nodeB = PROGRESS_NODES[i + 1];
      if (hours >= nodeA.hours && hours <= nodeB.hours) {
        const segWidth = 100 / (PROGRESS_NODES.length - 1);
        const subProgress = (hours - nodeA.hours) / (nodeB.hours - nodeA.hours);
        timelineFillPercent = (i * segWidth) + (subProgress * segWidth);
        break;
      }
    }
  }

  return {
    current,
    next,
    progressPercent,
    hoursToNext,
    timelineFillPercent: Math.round(timelineFillPercent)
  };
}

/**
 * Filters dataset to teachers who qualify for public recognition (100+ teaching hours)
 */
export function filterVerifiedTeachers(teachersList = []) {
  return (teachersList || []).filter(t => (t.teachingHours || 0) >= 100);
}
