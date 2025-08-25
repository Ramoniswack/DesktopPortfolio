import React from 'react';

const Skills: React.FC = () => {
  const skills = [
    {
      category: "Frontend Development",
      items: [
        "React.js & Next.js",
        "TypeScript & JavaScript",
        "HTML5 & CSS3",
        "Tailwind CSS",
        "Responsive Design",
        "UI/UX Implementation"
      ]
    },
    {
      category: "Backend Development",
      items: [
        "Node.js & Express.js",
        "Python & Django",
        "RESTful APIs",
        "GraphQL",
        "Database Design",
        "Server Architecture"
      ]
    },
    {
      category: "Database & Cloud",
      items: [
        "MongoDB & PostgreSQL",
        "MySQL & Redis",
        "AWS Services",
        "Docker & Kubernetes",
        "CI/CD Pipelines",
        "Cloud Deployment"
      ]
    },
    {
      category: "Tools & Technologies",
      items: [
        "Git & GitHub",
        "VS Code & IDEs",
        "Figma & Design Tools",
        "Testing Frameworks",
        "Agile Methodologies",
        "Project Management"
      ]
    }
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Technical Skills
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skillGroup, index) => (
          <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {skillGroup.category}
            </h3>
            <ul className="space-y-2">
              {skillGroup.items.map((skill, skillIndex) => (
                <li key={skillIndex} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-200">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Soft Skills
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Problem Solving",
            "Team Collaboration",
            "Communication",
            "Leadership",
            "Time Management",
            "Adaptability"
          ].map((softSkill, index) => (
            <div key={index} className="bg-gray-700/50 rounded-md p-2 text-center">
              <span className="text-sm text-gray-200">
                {softSkill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;