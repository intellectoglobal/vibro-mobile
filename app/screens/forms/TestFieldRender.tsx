// import React from 'react';
// import { Text, View, TextInput, Switch, TouchableOpacity } from 'react-native';
// import { Textarea, Textbox } from '@/components/FormFields';
// import styles from './styles';
// import { FieldRendererProps } from '@/types/forms';
// import getValidationRules from './validation';
// import { Picker } from '@react-native-picker/picker';

// const FieldRenderer: React.FC<FieldRendererProps> = ({
//   control,
//   question,
//   stageOrder,
//   errors,
//   isEnabled,
// }) => {
//   const fieldName = `stage-${stageOrder}-${question.id}`;
//   const error = errors[fieldName];
//   const validationRules = getValidationRules(question);

//   console.log("question ::", question)

//   const renderInput = () => {
//     switch (question.question_type) {
//       case 'short_answer':
//         return (
//           <View style={styles.questionContainer}>
//             <Textbox
//               control={control}
//               style={styles.textInput}
//               placeholder={question.question_hint || `Enter ${question.question.toLowerCase()}`}
//               editable={isEnabled}
//               name={fieldName}
//               rules={validationRules}
//               error={error}
//               isRequired={question.is_required}
//               label={question.question}
//             />
//             {/* {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )} */}
//           </View>
//         );

//       case 'long_answer':
//         return (
//           <View style={styles.questionContainer}>
//             <Textarea
//               control={control}
//               style={[styles.textInput, styles.textArea]}
//               placeholder={question.question_hint || `Enter ${question.question.toLowerCase()}`}
//               editable={isEnabled}
//               name={fieldName}
//               rules={validationRules}
//               error={error}
//               isRequired={question.is_required}
//               label={question.question}
//             />
//             {/* {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )} */}
//           </View>
//         );

//       case 'dropdown':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {/* {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )} */}
//             <Picker
//               enabled={isEnabled}
//               style={styles.dropdown}
//               selectedValue={control._formValues[fieldName] || ''}
//               onValueChange={(value: any) => control.setValue(fieldName, value)}
//             >
//               <Picker.Item label="Select an option" value="" />
//               {question.options?.map((option) => (
//                 <Picker.Item
//                   key={option.id}
//                   label={option.option}
//                   value={option.option}
//                 />
//               ))}
//               {question.is_other && <Picker.Item label="Other" value="other" />}
//             </Picker>
//             {error && <Text style={styles.errorText}>{error.message}</Text>}
//           </View>
//         );

//       case 'checkboxes':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {/* {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )} */}
//             <View style={styles.checkboxContainer}>
//               {question.options?.map((option) => (
//                 <View key={option.id} style={styles.checkboxItem}>
//                   <Text>{option.option}</Text>
//                   {/* Note: React Native doesn't have a native checkbox; consider a custom component or library */}
//                   <Text>(Checkbox placeholder for {option.option})</Text>
//                 </View>
//               ))}
//               {question.is_other && <Text>(Checkbox placeholder for Other)</Text>}
//             </View>
//             {error && <Text style={styles.errorText}>{error.message}</Text>}
//           </View>
//         );

//       case 'multiple_choice':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <View style={styles.radioContainer}>
//               {question.options?.map((option) => (
//                 <View key={option.id} style={styles.radioItem}>
//                   <Text>{option.option}</Text>
//                   {/* Note: React Native doesn't have a native radio button; consider a custom component or library */}
//                   <Text>(Radio placeholder for {option.option})</Text>
//                 </View>
//               ))}
//               {question.is_other && <Text>(Radio placeholder for Other)</Text>}
//             </View>
//             {error && <Text style={styles.errorText}>{error.message}</Text>}
//           </View>
//         );

//       case 'formula':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <TextInput
//               style={styles.textInput}
//               placeholder="Formula result (read-only)"
//               value={question.formula || ''}
//               editable={false}
//             />
//             <Text style={styles.hintText}>
//               Formula: {question.formula || 'No formula defined'}
//             </Text>
//           </View>
//         );

//       case 'table':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             {question.sub_questions?.map((subQuestion) => (
//               <View key={subQuestion.id} style={styles.subQuestionContainer}>
//                 <FieldRenderer
//                   control={control}
//                   question={subQuestion}
//                   stageOrder={stageOrder}
//                   errors={errors}
//                   isEnabled={isEnabled}
//                 />
//               </View>
//             ))}
//           </View>
//         );

//       case 'location':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <Textbox
//               control={control}
//               style={styles.textInput}
//               placeholder={question.question_hint || 'Enter location'}
//               editable={isEnabled}
//               name={fieldName}
//               rules={validationRules}
//               error={error}
//               isRequired={question.is_required}
//               label={question.question}
//             />
//           </View>
//         );

//       case 'upload_image':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <View style={styles.switchContainer}>
//               <Text>Requires Live Photo</Text>
//               <Switch
//                 value={question.require_live}
//                 disabled={!isEnabled}
//                 onValueChange={(value) => control.setValue(fieldName, value)}
//               />
//             </View>
//             <Text>Max files: {question.number_of_file_allowed || 'Not specified'}</Text>
//             <Text>(Image upload placeholder)</Text>
//             {error && <Text style={styles.errorText}>{error.message}</Text>}
//           </View>
//         );

//       case 'upload_video':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <View style={styles.switchContainer}>
//               <Text>Requires Live Video</Text>
//               <Switch
//                 value={question.require_live}
//                 disabled={!isEnabled}
//                 onValueChange={(value) => control.setValue(fieldName, value)}
//               />
//             </View>
//             <Text>(Video upload placeholder)</Text>
//             {error && <Text style={styles.errorText}>{error.message}</Text>}
//           </View>
//         );

//       case 'upload_file':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <Text>Max files: {question.number_of_file_allowed || 'Not specified'}</Text>
//             <Text>(File upload placeholder)</Text>
//             {error && <Text style={styles.errorText}>{error.message}</Text>}
//           </View>
//         );

//       case 'signature':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <Text>(Signature placeholder)</Text>
//             {error && <Text style={styles.errorText}>{error.message}</Text>}
//           </View>
//         );

//       case 'qr_code':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <Textbox
//               control={control}
//               style={styles.textInput}
//               placeholder={question.question_hint || 'Scan or enter QR code'}
//               editable={isEnabled}
//               name={fieldName}
//               rules={validationRules}
//               error={error}
//               isRequired={question.is_required}
//               label={question.question}
//             />
//           </View>
//         );

//       case 'division':
//       case 'sub_division':
//       case 'datetime':
//       case 'date':
//       case 'time':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <Textbox
//               control={control}
//               style={styles.textInput}
//               placeholder={question.question_hint || `Enter ${question.question.toLowerCase()}`}
//               editable={isEnabled}
//               name={fieldName}
//               rules={validationRules}
//               error={error}
//               isRequired={question.is_required}
//               label={question.question}
//             />
//           </View>
//         );

//       case 'title_and_description':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {/* {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )} */}
//             <Text>(Display-only title and description)</Text>
//           </View>
//         );

//       case 'user':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <Textbox
//               control={control}
//               style={styles.textInput}
//               placeholder={question.question_hint || 'Enter user details'}
//               editable={isEnabled}
//               name={fieldName}
//               rules={validationRules}
//               error={error}
//               isRequired={question.is_required}
//               label={question.question}
//             />
//           </View>
//         );

//       case 'linear_scale':
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question}
//               {question.is_required && <Text style={styles.required}> *</Text>}
//             </Text>
//             {question.description && (
//               <Text style={styles.hintText}>{question.description}</Text>
//             )}
//             <View style={styles.linearScaleContainer}>
//               {Array.from(
//                 { length: (question.max_value || 5) - (question.min_value || 1) + 1 },
//                 (_, i) => i + (question.min_value || 1)
//               ).map((value) => (
//                 <TouchableOpacity
//                   key={value}
//                   style={styles.linearScaleItem}
//                   disabled={!isEnabled}
//                   onPress={() => control.setValue(fieldName, value)}
//                 >
//                   <Text>{value}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             {error && <Text style={styles.errorText}>{error.message}</Text>}
//           </View>
//         );

//       default:
//         return (
//           <View style={styles.questionContainer}>
//             <Text style={styles.questionText}>
//               {question.question} (Unsupported type: {question.question_type})
//             </Text>
//           </View>
//         );
//     }
//   };

//   return renderInput();
// };

// export default FieldRenderer;