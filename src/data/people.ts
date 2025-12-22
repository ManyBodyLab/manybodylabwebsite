/**
 * Manually maintained list of ManyBodyLab team members
 * 
 * To add a new member:
 * 1. Add their information to the MEMBERS array below
 * 2. Include name, bio, github username, and avatar URL
 * 3. Optionally add linkedin username if available
 */

export interface Member {
  name: string;
  bio: string;
  github: string;
  linkedin: string | null;
  avatar: string;
}

export const MEMBERS: Member[] = [
  {
    name: "AFeuerpfeil",
    bio: "Member of ManyBodyLab organization",
    github: "AFeuerpfeil",
    linkedin: null,
    avatar: "https://avatars.githubusercontent.com/u/36232041?v=4",
  },
];
