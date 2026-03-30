import { motion } from 'motion/react';

export function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "Java", level: 75 },
        { name: "SQL", level: 85 },
        { name: "C#", level: 70 }
      ]
    },
    {
      title: "Web Dev",
      skills: [
        { name: "React / Next.js", level: 90 },
        { name: "Node.js / Express", level: 85 },
        { name: "Django / Flask", level: 80 },
        { name: "Vue.js", level: 75 },
        { name: "Laravel", level: 70 }
      ]
    },
    {
      title: "Infrastructure & Cloud",
      skills: [
        { name: "Linux (Ubuntu/CentOS)", level: 90 },
        { name: "Windows Server", level: 85 },
        { name: "AWS", level: 80 },
        { name: "Azure", level: 75 },
        { name: "Docker / Kubernetes", level: 80 }
      ]
    },
    {
      title: "Data & Databases",
      skills: [
        { name: "PostgreSQL / MySQL", level: 90 },
        { name: "MongoDB", level: 85 },
        { name: "Spark / Hadoop", level: 75 },
        { name: "Power BI / Tableau", level: 80 },
        { name: "Machine Learning (Scikit)", level: 70 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-font mb-4">
            Compétences Techniques
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Une maîtrise full-stack et infrastructure pour répondre à tous les besoins techniques de votre PFE.
          </p>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="text-xl font-bold heading-font mb-6 text-primary-400 border-b border-gray-800 pb-2">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      <span className="text-sm font-medium text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary-600 to-secondary-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1) }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-gray-800 text-center">
          <h3 className="text-xl font-bold heading-font mb-8 text-gray-300">Outils & Méthodologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Git / GitHub', 'JIRA / Trello', 'Agile / Scrum', 'CI/CD (Jenkins/Actions)', 'Figma', 'Postman'].map((tool, idx) => (
              <span key={idx} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium border border-gray-700">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
