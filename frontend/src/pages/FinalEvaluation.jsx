// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios';

// const FinalEvaluation = () => {
//   const navigate = useNavigate();

//   const [facultyList, setFacultyList] = useState([]);
//   const [facultyId, setFacultyId] = useState('');
//   const [academicYears, setAcademicYears] = useState([]);
//   const [academicYear, setAcademicYear] = useState('');
//   const [remarks, setRemarks] = useState('');

//   const [contributions, setContributions] = useState([]);
//   const [finalScore, setFinalScore] = useState(0);

//   const [loading, setLoading] = useState(true);

//   // /* 🔹 Load faculty list */
//   // useEffect(() => {
//   //   loadFaculty();
//   // }, []);

//   // const loadFaculty = async () => {
//   //   try {
//   //     const res = await api.get('/evaluations/faculty');

//   //     const uniqueFaculty = [];
//   //     const map = new Map();

//   //     res.data.forEach((c) => {
//   //       if (c.faculty && !map.has(c.faculty._id)) {
//   //         map.set(c.faculty._id, c.faculty);
//   //         uniqueFaculty.push(c.faculty);
//   //       }
//   //     });

//   //     setFacultyList(uniqueFaculty);
//   //   } catch (err) {
//   //     alert('Failed to load faculty list');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   useEffect(() => {
//   const loadFaculty = async () => {
//     try {
//       const res = await api.get('/evaluations/faculty-list'); // your backend route
//       // res.data might look like [{_id, name, email}, ...]
//       if (res.data && res.data.length > 0) {
//         setFacultyList(res.data);
//       } else {
//         setFacultyList([]);
//       }
//     } catch (err) {
//       alert('Failed to load faculty list');
//       setFacultyList([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadFaculty();
// }, []);


//   /* 🔹 Load academic years when faculty selected */
//   useEffect(() => {
//     if (facultyId) {
//       loadAcademicYears();
//       setAcademicYear('');
//       setContributions([]);
//       setFinalScore(0);
//     }
//   }, [facultyId]);

//   const loadAcademicYears = async () => {
//     try {
//       const res = await api.get(
//         `/evaluations/faculty/${facultyId}/years`
//       );
//       setAcademicYears(res.data);
//     } catch (err) {
//       alert('Failed to load academic years');
//     }
//   };

//   /* 🔹 Load contributions when year selected */
//   useEffect(() => {
//     if (facultyId && academicYear) {
//       loadContributions();
//     }
//   }, [facultyId, academicYear]);

//   const loadContributions = async () => {
//     try {
//       const res = await api.get(
//         `/evaluations/final-preview/${facultyId}/${academicYear}`
//       );

//       setContributions(res.data.contributions);
//       setFinalScore(res.data.finalScore);
//     } catch (err) {
//       alert('Failed to load contributions');
//     }
//   };

//   /* 🔹 Submit final evaluation */
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   await api.post('/evaluations/final', {
//   //     facultyId,
//   //     academicYear,
//   //     finalScore,
//   //     remarks
//   //   });

//   //   alert('Final evaluation submitted successfully');
//   //   navigate('/evaluator');
//   // };

//   // if (loading) return <p>Loading...</p>;
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!facultyId || !academicYear) {
//     alert('Faculty and academic year are required!');
//     return;
//   }

//   try {
//     const res = await api.post('/evaluations/final', {
//       facultyId,
//       academicYear,
//       remarks
//       // finalScore is auto-calculated in backend, no need to send from frontend
//     });

//     alert(res.data.message || 'Final evaluation submitted successfully');
//     navigate('/evaluator');
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     alert(
//       'Failed to submit final evaluation: ' +
//         (err.response?.data?.message || err.message)
//     );
//   }
// };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={styles.container}>
//       <h2>Final Faculty Evaluation</h2>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         {/* Faculty */}
//         <select
//           value={facultyId}
//           onChange={(e) => setFacultyId(e.target.value)}
//           required
//         >
//           <option value="">Select Faculty</option>
//           {facultyList.map((f) => (
//             <option key={f._id} value={f._id}>
//               {f.name}
//             </option>
//           ))}
//         </select>

//         {/* Academic Year */}
//         {academicYears.length > 0 && (
//           <select
//             value={academicYear}
//             onChange={(e) => setAcademicYear(e.target.value)}
//             required
//           >
//             <option value="">Select Academic Year</option>
//             {academicYears.map((y) => (
//               <option key={y} value={y}>
//                 {y}
//               </option>
//             ))}
//           </select>
//         )}

//         {/* Contributions Preview */}
//         {contributions.length > 0 && (
//           <>
//             <h4>Approved Contributions</h4>
//             <ul style={styles.list}>
//               {contributions.map((c) => (
//                 <li key={c._id}>
//                   {/* <strong>{c.title}</strong> — Score: {c.score} */}
//                   <strong>{c.title}</strong> — Score: {c.score} <br />
//                   <em>{c.description}</em> | Category: {c.category} | Submitted: {new Date(c.createdAt).toLocaleDateString()}
//                 </li>
//               ))}
//             </ul>

//             <p>
//               <strong>Final Score (Auto Calculated):</strong> {finalScore}
//             </p>
//           </>
//         )}

//         {/* Remarks */}
//         <textarea
//           placeholder="Final Remarks"
//           value={remarks}
//           onChange={(e) => setRemarks(e.target.value)}
//         />

//         <button type="submit">Submit Final Evaluation</button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '40px auto'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '12px'
//   },
//   list: {
//     background: '#f5f5f5',
//     padding: '10px',
//     borderRadius: '5px'
//   }
// };

// export default FinalEvaluation;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const FinalEvaluation = () => {
  const navigate = useNavigate();

  const [facultyList, setFacultyList] = useState([]);
  const [facultyId, setFacultyId] = useState('');
  const [academicYears, setAcademicYears] = useState([]);
  const [academicYear, setAcademicYear] = useState('');
  const [remarks, setRemarks] = useState('');

  const [contributions, setContributions] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const [allScored, setAllScored] = useState(false);

  // 🔹 Load faculty list
  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const res = await api.get('/evaluations/faculty-list');
        setFacultyList(res.data || []);
      } catch (err) {
        alert('Failed to load faculty list');
        setFacultyList([]);
      } finally {
        setLoading(false);
      }
    };
    loadFaculty();
  }, []);

  // 🔹 Load academic years when faculty selected
  useEffect(() => {
    if (facultyId) {
      const loadYears = async () => {
        try {
          const res = await api.get(`/evaluations/faculty/${facultyId}/years`);
          setAcademicYears(res.data || []);
        } catch (err) {
          alert('Failed to load academic years');
        }
      };
      loadYears();
      setAcademicYear('');
      setContributions([]);
      setFinalScore(0);
      setAllScored(false);
    }
  }, [facultyId]);

  // 🔹 Load contributions when year selected
  useEffect(() => {
    if (facultyId && academicYear) {
      const loadContributions = async () => {
        try {
          const res = await api.get(
            `/evaluations/final-preview/${facultyId}/${academicYear}`
          );
          setContributions(res.data.contributions || []);
          setFinalScore(res.data.finalScore || 0);

          // Check if all contributions have a score
          // const scored = res.data.contributions.every(c => c.score !== undefined && c.score !== null);
          // setAllScored(scored);
          setAllScored(res.data.allEvaluated == true);

        } catch (err) {
          alert('Failed to load contributions');
          setContributions([]);
          setFinalScore(0);
          setAllScored(false);
        }
      };
      loadContributions();
    }
  }, [facultyId, academicYear]);

  // 🔹 Submit final evaluation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!facultyId || !academicYear) {
      alert('Faculty and academic year are required!');
      return;
    }

    if (!allScored) {
      alert('Cannot submit. Some contributions are not yet scored.');
      return;
    }

    try {
      await api.post('/evaluations/final', { facultyId, academicYear, remarks });
      alert('Final evaluation submitted successfully');
      navigate('/evaluator');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to submit final evaluation: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>Final Faculty Evaluation</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Faculty */}
        <select
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          required
        >
          <option value="">Select Faculty</option>
          {facultyList.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>

        {/* Academic Year */}
        {academicYears.length > 0 && (
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            required
          >
            <option value="">Select Academic Year</option>
            {/* {academicYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))} */}
            {academicYears.map((yObj) => (
  <option
    key={yObj.year}
    value={yObj.year}
    disabled={yObj.finalized}
  >
    {yObj.year} {yObj.finalized ? "(Already Evaluated)" : ""}
  </option>
))}

          </select>
            )}

        {/* Contributions Preview */}
        {/* {contributions.length > 0 && ( */}
        {facultyId && academicYear && (

          // <>
          //   <h4>Approved Contributions</h4>
          //   {!allScored && (
          //     <p style={{ color: 'red' }}>
          //       ⚠ Some contributions are not yet scored. Final evaluation cannot be submitted.
          //     </p>
          //   )}
          //   <ul style={styles.list}>
          //     {contributions.map((c) => (
          //       <li key={c._id}>
          //         <strong>{c.title}</strong> — Score: {c.score ?? 'Not scored yet'} <br />
          //         <em>{c.description}</em> | Category: {c.category} | Submitted: {new Date(c.createdAt).toLocaleDateString()}
          //       </li>
          //     ))}
          //   </ul>

          //   <p>
          //     <strong>Final Score (Auto Calculated):</strong> {finalScore}
          //   </p>
          // </>
          <>
  <h4>Contributions for {academicYear}</h4>

  {!allScored && (
    <p style={{ color: 'red', fontWeight: 'bold' }}>
      ⚠ Evaluate all contributions of year {academicYear} before final evaluation.
    </p>
  )}

  <ul style={styles.list}>
    {contributions.map((c) => (
      <li key={c._id}>
        <strong>{c.title}</strong> — 
        Score: {c.score ?? 'Not evaluated yet'} <br />
        <em>{c.description}</em> | 
        Category: {c.category}
      </li>
    ))}
  </ul>

  {allScored && (
    <>
      <p>
        <strong>Final Score (Auto Calculated):</strong> {finalScore}
      </p>

      <textarea
        placeholder="Final Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <button type="submit">
        Submit Final Evaluation
      </button>
    </>
  )}
</>

          
        )}

        
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: '600px', margin: '40px auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  list: { background: '#f5f5f5', padding: '10px', borderRadius: '5px' }
};

export default FinalEvaluation;
