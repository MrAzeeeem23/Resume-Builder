import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 40,
    lineHeight: 1.4,
    fontFamily: "Times-Roman",
  },

  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 4,
    flexWrap: "wrap",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 2,
  },
  contactIcon: {
    fontSize: 10,
    marginRight: 5,
    color: "#333",
  },
  contactText: {
    fontSize: 10,
    color: "#333",
  },

  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textDecoration: "underline",
    color: "#000",
  },

  summaryText: {
    fontSize: 10,
    textAlign: "justify",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  educationItem: {
    marginBottom: 8,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  institutionName: {
    fontSize: 11,
    fontWeight: "bold",
    flex: 1,
  },
  dateRange: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#666",
    textAlign: "right",
    minWidth: 120,
  },
  degreeInfo: {
    fontSize: 10,
    marginBottom: 2,
    color: "#333",
  },
  experienceItem: {
    marginBottom: 14,
  },
  companyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  companyName: {
    fontSize: 11,
    fontWeight: "bold",
    flex: 1,
  },
  roleInfo: {
    fontSize: 10,
    marginBottom: 5,
    color: "#444",
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 4,
    marginLeft: 12,
    textAlign: "justify",
    lineHeight: 1.3,
  },

  projectItem: {
    marginBottom: 12,
  },
  projectHeader: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 1.2,
  },

  skillCategory: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  skillLabel: {
    fontSize: 10,
    fontWeight: "bold",
    minWidth: 140,
    color: "#000",
  },
  skillList: {
    fontSize: 10,
    flex: 1,
    color: "#333",
  },
  achievementItem: {
    fontSize: 10,
    marginBottom: 4,
    marginLeft: 12,
    textAlign: "justify",
    lineHeight: 1.3,
  },
})

const ResumePDF = ({ resume }) => {
  if (!resume) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No resume data available</Text>
        </Page>
      </Document>
    )
  }

  const cleanText = (text) => {
    if (!text) return ""
    return text.toString().trim()
  }

  const hasData = (data) => {
    if (!data) return false
    if (Array.isArray(data)) return data.length > 0
    if (typeof data === "object") return Object.keys(data).length > 0
    return cleanText(data) !== ""
  }

  const formatProjectHeader = (project) => {
    const parts = [
      cleanText(project.title),
      cleanText(project.technologies),
      cleanText(project.link),
      cleanText(project.documentation),
    ].filter((part) => part && part !== "")

    return parts.join(" | ")
  }

  const formatCompanyHeader = (exp) => {
    const parts = [cleanText(exp.company), cleanText(exp.certificate)].filter((part) => part && part !== "")

    return parts.join(" | ")
  }


  const formatRoleInfo = (exp) => {
    const parts = [cleanText(exp.role), cleanText(exp.projectLink), cleanText(exp.location)].filter(
      (part) => part && part !== "",
    )

    return parts.join(" | ")
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {hasData(resume?.contact?.fullName) && <Text style={styles.name}>{cleanText(resume.contact.fullName)}</Text>}

          {(hasData(resume?.contact?.phone) || hasData(resume?.contact?.email)) && (
            <View style={styles.contactRow}>
              {hasData(resume?.contact?.phone) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>📱</Text>
                  <Text style={styles.contactText}>{cleanText(resume.contact.phone)}</Text>
                </View>
              )}

              {hasData(resume?.contact?.email) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>✉</Text>
                  <Text style={styles.contactText}>{cleanText(resume.contact.email)}</Text>
                </View>
              )}
            </View>
          )}

          {(hasData(resume?.contact?.linkedin) || hasData(resume?.contact?.github)) && (
            <View style={styles.contactRow}>
              {hasData(resume?.contact?.linkedin) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>🔗</Text>
                  <Text style={styles.contactText}>{cleanText(resume.contact.linkedin)}</Text>
                </View>
              )}

              {hasData(resume?.contact?.github) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>🔗</Text>
                  <Text style={styles.contactText}>{cleanText(resume.contact.github)}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {hasData(resume?.summary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{cleanText(resume.summary)}</Text>
          </View>
        )}
        {hasData(resume?.education) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu, i) => (
              <View key={i} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  {hasData(edu.institution) && <Text style={styles.institutionName}>{cleanText(edu.institution)}</Text>}
                  {hasData(edu.duration) && <Text style={styles.dateRange}>{cleanText(edu.duration)}</Text>}
                </View>
                {(hasData(edu.degree) || hasData(edu.location)) && (
                  <Text style={styles.degreeInfo}>
                    {cleanText(edu.degree)} {cleanText(edu.location)}
                  </Text>
                )}
                {hasData(edu.cgpa) && <Text style={styles.degreeInfo}>CGPA: {cleanText(edu.cgpa)}</Text>}
              </View>
            ))}
          </View>
        )}

        {hasData(resume?.experience) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {resume.experience.map((exp, i) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.companyHeader}>
                  <Text style={styles.companyName}>{formatCompanyHeader(exp)}</Text>
                  {hasData(exp.duration) && <Text style={styles.dateRange}>{cleanText(exp.duration)}</Text>}
                </View>
                <Text style={styles.roleInfo}>{formatRoleInfo(exp)}</Text>
                {hasData(exp.responsibilities) &&
                  exp.responsibilities.map((resp, j) => (
                    <Text key={j} style={styles.bulletPoint}>
                      • {cleanText(resp)}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}


        {hasData(resume?.projects) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map((proj, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={styles.projectHeader}>{formatProjectHeader(proj)}</Text>
                {hasData(proj.description) &&
                  proj.description.map((desc, j) => (
                    <Text key={j} style={styles.bulletPoint}>
                      • {cleanText(desc)}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}
        {hasData(resume?.skills) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {hasData(resume.skills.languages) && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillLabel}>Languages :</Text>
                <Text style={styles.skillList}>{resume.skills.languages.map(cleanText).join(", ")}.</Text>
              </View>
            )}
            {hasData(resume.skills.tools) && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillLabel}>Tools/Platforms :</Text>
                <Text style={styles.skillList}>{resume.skills.tools.map(cleanText).join(", ")}.</Text>
              </View>
            )}
            {hasData(resume.skills.technologies) && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillLabel}>Technologies/Frameworks :</Text>
                <Text style={styles.skillList}>{resume.skills.technologies.map(cleanText).join(", ")}.</Text>
              </View>
            )}
          </View>
        )}

        {hasData(resume?.achievements) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {resume.achievements.map((achievement, i) => (
              <Text key={i} style={styles.achievementItem}>
                • {cleanText(achievement)}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}

export default ResumePDF
