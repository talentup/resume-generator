import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeCertification } from "lib/redux/types";

export const ResumePDFCertification = ({
  heading,
  certification,
  themeColor,
}: {
  heading: string;
  certification: ResumeCertification[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading} style={{ gap: "0" }}>
      {certification.map(({ certTitle, date }, idx) => {
        return (
          <View key={idx}>
            <View>
              <ResumePDFBulletList items={[`${certTitle} ${date ? "-" : " "} ${date}`]} />
            </View>
          </View>
        );
      })}
    </ResumePDFSection>
  );
};
