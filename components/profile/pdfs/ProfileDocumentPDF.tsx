import { UserType } from "@/types/user";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

// Create styles

Font.register({
  family: "Helvetica",
  src: "https://fonts.gstatic.com/s/inter/v19/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf",
});

Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    paddingVertical: 40,
  },
  righttsection: {
    paddingHorizontal: 20,
    flexGrow: 1,
    width: "65%",
  },
  section1: {
    backgroundColor: "#253659",
    width: "35%",
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    color: "white",
  },
});

// Create Document Component
interface ProfileDocumentPDFProps {
  user: UserType;
}
export const ProfileDocumentPDF = ({ user }: ProfileDocumentPDFProps) => {
  return (
    <Document
      style={{
        fontSize: 14,
        fontFamily: "Helvetica",
      }}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.section1}>
          <Text style={{ fontSize: 16, fontWeight: "bold", paddingBottom: 10 }}>
            {user.name}
          </Text>
          <View>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ fontSize: 12, paddingBottom: 10 }}>
                651 N Broad St, Middletown, DE, Madagascar
              </Text>
              <Text style={{ fontSize: 12, paddingBottom: 10 }}>
                {user.contact?.phone}
              </Text>
              <Text style={{ fontSize: 12, paddingBottom: 10 }}>
                {user.contact?.email}
              </Text>
              <Text style={{ fontSize: 12, paddingBottom: 10 }}>
                {user.contact?.github}
              </Text>
            </View>
            <View style={{ paddingTop: 10, borderTop: "1px solid #ccc" }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>SKILLS</Text>
            </View>
            <View style={{ paddingTop: 20 }}>
              {user.skills?.map((sk) => {
                return (
                  <Text key={sk.id} style={{ fontSize: 12, paddingBottom: 5 }}>
                    {sk.skill.name}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
        <View style={styles.righttsection}>
          <View style={styles.section} {...{ bookmark: "Test bookmark" }}>
            <Text
              style={{
                textTransform: "uppercase",
                fontWeight: "light",
              }}
            >
              {user.title}
            </Text>
            <Text style={{ fontWeight: "bold", paddingVertical: 15 }}>
              Summary
            </Text>
            <Text style={{ fontSize: 12 }}>{user.summary}</Text>
          </View>
          <View style={styles.section} wrap={false}>
            <Text style={{ fontWeight: "bold", paddingBottom: 30 }}>
              SUMMARY
            </Text>
            <Text style={{ fontSize: 12 }}>
              🎯 Développeur Fullstack JavaScript/TypeScript - Freelance 💻
              Spécialisé en TypeScript/JavaScript, Node.js, React, Next.js, et
              architectures scalables 🧠 Passionné par les solutions claires,
              performantes et faciles à maintenir Depuis plus de 6 ans, j’aide
              des entreprises à créer, améliorer et faire évoluer leurs
              applications web — que ce soit des SaaS, des plateformes métiers
              ou des outils internes. Je combine expertise technique, rigueur
              produit et une vraie culture de la collaboration. Ce que j’apporte
              : 🔹 Développement rapide & structuré (backend + frontend) 🔹
              Approche orientée performance, lisibilité et scalabilité 🔹 Vision
              produit et sens des priorités 🔹 Capacité à travailler seul ou en
              équipe avec sérieux 🌍 Ouvert aux missions freelance en remote,
              principalement en 🇫🇷 France, 🇧🇪 Belgique, 🇨🇭 Suisse 💬 Vous avez
              un projet en tête ou besoin d’un renfort tech ? Parlons-en !
            </Text>
          </View>
          <View style={styles.section} wrap={false}>
            <Text style={{ fontWeight: "bold" }}>SUMMARY</Text>
            <Text style={{ fontSize: 12 }}>
              🎯 Développeur Fullstack JavaScript/TypeScript - Freelance 💻
              Spécialisé en TypeScript/JavaScript, Node.js, React, Next.js, et
              architectures scalables 🧠 Passionné par les solutions claires,
              performantes et faciles à maintenir Depuis plus de 6 ans, j’aide
              des entreprises à créer, améliorer et faire évoluer leurs
              applications web — que ce soit des SaaS, des plateformes métiers
              ou des outils internes. Je combine expertise technique, rigueur
              produit et une vraie culture de la collaboration. Ce que j’apporte
              : 🔹 Développement rapide & structuré (backend + frontend) 🔹
              Approche orientée performance, lisibilité et scalabilité 🔹 Vision
              produit et sens des priorités 🔹 Capacité à travailler seul ou en
              équipe avec sérieux 🌍 Ouvert aux missions freelance en remote,
              principalement en 🇫🇷 France, 🇧🇪 Belgique, 🇨🇭 Suisse 💬 Vous avez
              un projet en tête ou besoin d’un renfort tech ? Parlons-en !
            </Text>
          </View>
          <View style={styles.section} wrap={false}>
            <Text style={{ fontWeight: "bold" }}>SUMMARY</Text>
            <Text style={{ fontSize: 12 }}>
              🎯 Développeur Fullstack JavaScript/TypeScript - Freelance 💻
              Spécialisé en TypeScript/JavaScript, Node.js, React, Next.js, et
              architectures scalables 🧠 Passionné par les solutions claires,
              performantes et faciles à maintenir Depuis plus de 6 ans, j’aide
              des entreprises à créer, améliorer et faire évoluer leurs
              applications web — que ce soit des SaaS, des plateformes métiers
              ou des outils internes. Je combine expertise technique, rigueur
              produit et une vraie culture de la collaboration. Ce que j’apporte
              : 🔹 Développement rapide & structuré (backend + frontend) 🔹
              Approche orientée performance, lisibilité et scalabilité 🔹 Vision
              produit et sens des priorités 🔹 Capacité à travailler seul ou en
              équipe avec sérieux 🌍 Ouvert aux missions freelance en remote,
              principalement en 🇫🇷 France, 🇧🇪 Belgique, 🇨🇭 Suisse 💬 Vous avez
              un projet en tête ou besoin d’un renfort tech ? Parlons-en !
            </Text>
          </View>
          <View style={styles.section} wrap={false}>
            <Text style={{ fontWeight: "bold" }}>SUMMARY</Text>
            <Text style={{ fontSize: 12 }}>
              🎯 Développeur Fullstack JavaScript/TypeScript - Freelance 💻
              Spécialisé en TypeScript/JavaScript, Node.js, React, Next.js, et
              architectures scalables 🧠 Passionné par les solutions claires,
              performantes et faciles à maintenir Depuis plus de 6 ans, j’aide
              des entreprises à créer, améliorer et faire évoluer leurs
              applications web — que ce soit des SaaS, des plateformes métiers
              ou des outils internes. Je combine expertise technique, rigueur
              produit et une vraie culture de la collaboration. Ce que j’apporte
              : 🔹 Développement rapide & structuré (backend + frontend) 🔹
              Approche orientée performance, lisibilité et scalabilité 🔹 Vision
              produit et sens des priorités 🔹 Capacité à travailler seul ou en
              équipe avec sérieux 🌍 Ouvert aux missions freelance en remote,
              principalement en 🇫🇷 France, 🇧🇪 Belgique, 🇨🇭 Suisse 💬 Vous avez
              un projet en tête ou besoin d’un renfort tech ? Parlons-en !
            </Text>
          </View>
          <View style={styles.section} wrap={false}>
            <Text style={{ fontWeight: "bold" }}>SUMMARY</Text>
            <Text style={{ fontSize: 12 }}>
              🎯 Développeur Fullstack JavaScript/TypeScript - Freelance 💻
              Spécialisé en TypeScript/JavaScript, Node.js, React, Next.js, et
              architectures scalables 🧠 Passionné par les solutions claires,
              performantes et faciles à maintenir Depuis plus de 6 ans, j’aide
              des entreprises à créer, améliorer et faire évoluer leurs
              applications web — que ce soit des SaaS, des plateformes métiers
              ou des outils internes. Je combine expertise technique, rigueur
              produit et une vraie culture de la collaboration. Ce que j’apporte
              : 🔹 Développement rapide & structuré (backend + frontend) 🔹
              Approche orientée performance, lisibilité et scalabilité 🔹 Vision
              produit et sens des priorités 🔹 Capacité à travailler seul ou en
              équipe avec sérieux 🌍 Ouvert aux missions freelance en remote,
              principalement en 🇫🇷 France, 🇧🇪 Belgique, 🇨🇭 Suisse 💬 Vous avez
              un projet en tête ou besoin d’un renfort tech ? Parlons-en !
            </Text>
          </View>
          <View style={styles.section} wrap={false}>
            <Text style={{ fontWeight: "bold" }}>SUMMARY</Text>
            <Text style={{ fontSize: 12 }}>
              🎯 Développeur Fullstack JavaScript/TypeScript - Freelance 💻
              Spécialisé en TypeScript/JavaScript, Node.js, React, Next.js, et
              architectures scalables 🧠 Passionné par les solutions claires,
              performantes et faciles à maintenir Depuis plus de 6 ans, j’aide
              des entreprises à créer, améliorer et faire évoluer leurs
              applications web — que ce soit des SaaS, des plateformes métiers
              ou des outils internes. Je combine expertise technique, rigueur
              produit et une vraie culture de la collaboration. Ce que j’apporte
              : 🔹 Développement rapide & structuré (backend + frontend) 🔹
              Approche orientée performance, lisibilité et scalabilité 🔹 Vision
              produit et sens des priorités 🔹 Capacité à travailler seul ou en
              équipe avec sérieux 🌍 Ouvert aux missions freelance en remote,
              principalement en 🇫🇷 France, 🇧🇪 Belgique, 🇨🇭 Suisse 💬 Vous avez
              un projet en tête ou besoin d’un renfort tech ? Parlons-en !
            </Text>
          </View>
          <View style={styles.section} wrap={false}>
            <Text style={{ fontWeight: "bold" }}>SUMMARY</Text>
            <Text style={{ fontSize: 12 }}>
              🎯 Développeur Fullstack JavaScript/TypeScript - Freelance 💻
              Spécialisé en TypeScript/JavaScript, Node.js, React, Next.js, et
              architectures scalables 🧠 Passionné par les solutions claires,
              performantes et faciles à maintenir Depuis plus de 6 ans, j’aide
              des entreprises à créer, améliorer et faire évoluer leurs
              applications web — que ce soit des SaaS, des plateformes métiers
              ou des outils internes. Je combine expertise technique, rigueur
              produit et une vraie culture de la collaboration. Ce que j’apporte
              : 🔹 Développement rapide & structuré (backend + frontend) 🔹
              Approche orientée performance, lisibilité et scalabilité 🔹 Vision
              produit et sens des priorités 🔹 Capacité à travailler seul ou en
              équipe avec sérieux 🌍 Ouvert aux missions freelance en remote,
              principalement en 🇫🇷 France, 🇧🇪 Belgique, 🇨🇭 Suisse 💬 Vous avez
              un projet en tête ou besoin d’un renfort tech ? Parlons-en !
            </Text>
          </View>
          <View style={styles.section} wrap={false}>
            <Text style={{ fontWeight: "bold" }}>SUMMARY</Text>
            <Text style={{ fontSize: 12 }}>
              🎯 Développeur Fullstack JavaScript/TypeScript - Freelance 💻
              Spécialisé en TypeScript/JavaScript, Node.js, React, Next.js, et
              architectures scalables 🧠 Passionné par les solutions claires,
              performantes et faciles à maintenir Depuis plus de 6 ans, j’aide
              des entreprises à créer, améliorer et faire évoluer leurs
              applications web — que ce soit des SaaS, des plateformes métiers
              ou des outils internes. Je combine expertise technique, rigueur
              produit et une vraie culture de la collaboration. Ce que j’apporte
              : 🔹 Développement rapide & structuré (backend + frontend) 🔹
              Approche orientée performance, lisibilité et scalabilité 🔹 Vision
              produit et sens des priorités 🔹 Capacité à travailler seul ou en
              équipe avec sérieux 🌍 Ouvert aux missions freelance en remote,
              principalement en 🇫🇷 France, 🇧🇪 Belgique, 🇨🇭 Suisse 💬 Vous avez
              un projet en tête ou besoin d’un renfort tech ? Parlons-en !
            </Text>
          </View>
          <View style={styles.section} wrap={false}>
            <Text style={{ fontWeight: "bold" }}>SUMMARY</Text>
            <Text style={{ fontSize: 12 }}>
              🎯 Développeur Fullstack JavaScript/TypeScript - Freelance 💻
              Spécialisé en TypeScript/JavaScript, Node.js, React, Next.js, et
              architectures scalables 🧠 Passionné par les solutions claires,
              performantes et faciles à maintenir Depuis plus de 6 ans, j’aide
              des entreprises à créer, améliorer et faire évoluer leurs
              applications web — que ce soit des SaaS, des plateformes métiers
              ou des outils internes. Je combine expertise technique, rigueur
              produit et une vraie culture de la collaboration. Ce que j’apporte
              : 🔹 Développement rapide & structuré (backend + frontend) 🔹
              Approche orientée performance, lisibilité et scalabilité 🔹 Vision
              produit et sens des priorités 🔹 Capacité à travailler seul ou en
              équipe avec sérieux 🌍 Ouvert aux missions freelance en remote,
              principalement en 🇫🇷 France, 🇧🇪 Belgique, 🇨🇭 Suisse 💬 Vous avez
              un projet en tête ou besoin d’un renfort tech ? Parlons-en !
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
