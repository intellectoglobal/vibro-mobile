import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import AuditFormScreen from "./AuditForm";
import { mockData } from "./mockAuditData"; // Your mock data
import { Stage } from "@/types/forms";
import { FORM, GETFORMSUBMISSIONDETAILS } from "@/services/constants";
import api from "@/services";

interface AuditFormScreenProps {
  formId?: string;
  submissionId?: string;
}

const AuditFormWrapper: React.FC<AuditFormScreenProps> = ({
  formId,
  submissionId,
}) => {
  // const [audit, setAudit] = useState<Stage[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // // Fetch form stages
  // const getFormStages = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await api.get(
  //       submissionId
  //         ? `${GETFORMSUBMISSIONDETAILS}${formId}/${submissionId}`
  //         : `${FORM}${formId}/`
  //     );
  //     const data = response.data;
  //     console.log("audit ::", response.data);
  //     setAudit(data);
  //   } catch (error: any) {
  //     setError("Failed to load form stages");
  //     console.error("Error in getFormStages:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [formId, submissionId]);

  // // Fetch data on mount
  // useEffect(() => {
  //   getFormStages();
  // }, [getFormStages]);

  return (
    <View style={styles.container}>
      <AuditFormScreen route={{ params: { formData: mockData } }} />
      {/* <Text>
        hi from the audit form
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuditFormWrapper;
