import Link from "next/link";
import ProfilePicture from "./ProfilePicture";

interface GitHubMember {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GitHubUser {
  name: string | null;
  bio: string | null;
  blog: string | null;
  twitter_username: string | null;
}

interface Member {
  name: string;
  bio: string;
  github: string;
  linkedin: string | null;
  avatar: string;
}

async function fetchMembers(): Promise<Member[]> {
  try {
    // Fetch organization members from GitHub API
    const membersResponse = await fetch(
      "https://api.github.com/orgs/ManyBodyLab/members",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!membersResponse.ok) {
      console.error("Failed to fetch organization members:", membersResponse.status);
      return [];
    }

    const membersData: GitHubMember[] = await membersResponse.json();

    if (!Array.isArray(membersData) || membersData.length === 0) {
      console.log("No members found in organization");
      return [];
    }

    // Fetch detailed profile information for each member
    const memberDetails = await Promise.all(
      membersData.map(async (member) => {
        try {
          const userResponse = await fetch(
            `https://api.github.com/users/${member.login}`,
            {
              headers: {
                Accept: "application/vnd.github+json",
              },
              next: { revalidate: 3600 },
            }
          );

          if (!userResponse.ok) {
            console.error(`Failed to fetch user ${member.login}`);
            return null;
          }

          const userData: GitHubUser = await userResponse.json();

          // Extract LinkedIn from blog URL if it contains linkedin.com
          let linkedinUsername: string | null = null;
          if (userData.blog && userData.blog.includes("linkedin.com/in/")) {
            const match = userData.blog.match(/linkedin\.com\/in\/([^\/\?]+)/);
            if (match) {
              linkedinUsername = match[1];
            }
          }

          return {
            name: userData.name || member.login,
            bio: userData.bio || "Member of ManyBodyLab organization",
            github: member.login,
            linkedin: linkedinUsername,
            avatar: member.avatar_url,
          };
        } catch (err) {
          console.error(`Error fetching details for ${member.login}:`, err);
          return null;
        }
      })
    );

    // Filter out any failed requests
    return memberDetails.filter((member): member is Member => member !== null);
  } catch (err) {
    console.error("Error fetching members:", err);
    return [];
  }
}

export default async function People() {
  const members = await fetchMembers();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">ManyBodyLab</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Open-source software for quantum many-body physics
              </p>
            </div>
            <nav className="flex gap-6">
              <Link
                href="/"
                className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 font-medium"
              >
                Home
              </Link>
              <Link
                href="/people"
                className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 font-medium"
              >
                People
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Meet the researchers and developers behind ManyBodyLab&apos;s open-source quantum many-body physics software.
          </p>

          {members.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No team members found.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
            {members.map((member) => (
              <div
                key={member.github || member.name}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Profile Picture */}
                  <div className="flex-shrink-0">
                    <ProfilePicture 
                      src={member.avatar}
                      alt={`${member.name} profile`}
                      name={member.name}
                    />
                  </div>

                  {/* Member Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-4">
                      {member.github && (
                        <a
                          href={`https://github.com/${member.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                          aria-label={`${member.name}'s GitHub profile`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${member.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                          aria-label={`${member.name}'s LinkedIn profile`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400">
              © 2024 ManyBodyLab - Open-source quantum many-body physics software
            </p>
            <a
              href="https://github.com/ManyBodyLab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Visit us on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
