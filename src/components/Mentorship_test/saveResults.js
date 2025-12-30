// src/components/Mentorship_test/saveResults.js

// Note: adjusting path to find supabaseClient in 'src' folder
// ../../ means go up from 'Mentorship_test' -> 'components' -> 'src'
import { supabase } from '../../supabaseClient'; 

export const saveTestResults = async (candidateId, resultData, preData, answers) => {
  if (!candidateId) return;

  console.log("Saving results for:", candidateId);

  try {
    const { error } = await supabase
      .from('candidates')
      .update({
        // Inputs
        target_score: preData.target,
        current_mock_avg: preData.current,
        theory_coverage: preData.theory,
        practice_coverage: preData.practice,
        
        // Quiz Data
        quiz_responses: answers,
        
        // Calculated Results
        efficiency: parseFloat(resultData.efficiency),
        predicted_score: resultData.predictedMarks,
        min_predicted_score: resultData.minPredicted,
        max_predicted_score: resultData.maxPredicted,
        
        skill_dna: resultData.skillDNA,
        weakest_link: resultData.weakestLink,
        target_marks: resultData.targetMarks,
        
        verdict_status: resultData.verdict.status,
        verdict_msg: resultData.verdict.msg,
        days_left_snapshot: resultData.daysLeft
      })
      .eq('id', candidateId); 

    if (error) console.error("Supabase Save Error:", error);
    else console.log("✅ Results successfully saved to Supabase!");

  } catch (err) {
    console.error("Connection error while saving:", err);
  }
};