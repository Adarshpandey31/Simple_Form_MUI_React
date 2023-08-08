import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlarmIcon from '@mui/icons-material/AccessTimeFilled';
import DoneIcon from '@mui/icons-material/Done';
import ButtonGroup from '@mui/material/ButtonGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// import { CheckBox } from '@mui/icons-material';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Form() {
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const isScreen1000OrLess = useMediaQuery('(max-width:1000px)');
  const transitionKey = `${showForm}-${currentQuestion}`;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const [ratingClicked, setRatingClicked] = useState(false);

  const questions = [
    ["Enter your name*", "input", ""],
    ["Enter your brand name*", "input", ""],
    ["How satisfied are you with the overall experience of working with upcred.ai*", "rating", ""],
    ["Did upcred.ai team effectively understand and address your brand's goals and objectives?*", "tick", ""],
    ["How well did our team communicate and collaborate with your brand throughout the campaign?*", "rating", ""],
    ["Were the deliverables and content produced by upcred.ai in line with your expectations and brand guidelines?*", "tick", ""],
    ["Did the campaign generate the desired results and meet your marketing objectives?*", "tick", ""],
    ["How likely are you to recommend upcred.ai to other brands based on your experience?*", "rating", ""],
    ["Would you consider partnering with upcred.ai again for future campaigns?*", "tick", "last"],
  ];


  //for taking output from the rating of the user
  const handleRatingClick = (rating) => {
    setRatingClicked(rating);
    setTimeout(() => {
      handleNextQuestion();
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      // Reset form data for the next question
      setFormData({});
    } else {
      if (showForm) {
        // If form is visible, hide it
        setShowForm(false);
        setCurrentQuestion(0);
      } else {
        // If form is already hidden, submit the data or perform any other action
        console.log(formData);
        setShowForm(true);
      }
    }
  };


  //for light and dark mode
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!showForm && (
          <CSSTransition
            in={!showForm}
            timeout={600}
            classNames="form-fade-out"
            unmountOnExit
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              minHeight="100vh"
              // position="fixed"
              // bottom={0}
              // left={0}
              // right={0}
              // top={0}
              fontSize={22}
              padding="0"
              margin="0"
              // border={1}
              sx={{
                fontFamily: ['arial'],
                overflow: "hidden",
                '@media (max-width: 700px)': {
                  fontSize: 18,
                },
                '@media (max-width: 450px)': {
                  fontSize: 16,
                },
              }}
            >
              <Box
                marginBottom={3}
                // border={1}
                sx={{
                  fontFamily: ['arial'],
                  '@media (max-width: 700px)': {
                    fontSize: 18,
                  },
                  '@media (max-width: 450px)': {
                    fontSize: 16,
                  },
                  marginBottom: 2,
                }}>
                Brand Feedback Form
              </Box>
              <Box
                marginBottom={3}
                fontStyle={blur}
                fontWeight={1}
                sx={{ opacity: [0.5], marginBottom: 2.5, }}
              // border={1}
              >
                We are committed to delivering the best experiences
              </Box>
              <Box
                mt={1}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                paddingLeft={12}
                // border={1}
                sx={{
                  fontFamily: ['arial'],
                  '@media (max-width: 700px)': {
                    fontSize: 16,
                    paddingLeft: 0,
                    bottom: 0,
                    marginTop: 0,
                  },
                }}>
                <Button sx={{
                  '@media (max-width: 700px)': { fontSize: 15, bottom: 0, },
                  '@media (max-width: 450px)': { fontSize: 13, },
                  padding: [1],
                  fontSize: [18],
                  fontWeight: ['bold'],
                  fontFamily: ['arial'],
                  backgroundColor: "rgb(4, 69, 175)",
                  color: "white",
                }}
                  variant="contained"
                  onClick={() => setShowForm(true)}>
                  Tell us what you think
                </Button>
                <Box
                  sx={{
                    padding: [1],
                    fontSize: [15],
                    '@media (max-width: 700px)': { display: "none", },
                  }}
                // border={1}
                >
                  click here ↵
                </Box>
              </Box>
              <Box
                mt={1}
                // fontSize="15"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                // border={1}
                sx={{
                  fontSize: [15],
                  '@media (max-width: 450px)': {
                    fontSize: 13,
                  },
                }}>
                <AlarmIcon sx={{ fontSize: [17], marginRight: [0.5], '@media (max-width: 700px)': { fontSize: 15, }, }} />
                Takes 1 minute
              </Box>
            </Box>
          </CSSTransition>
        )}

        <TransitionGroup>
          {showForm && (
            <CSSTransition
              key={transitionKey}
              in={true}
              timeout={600}
              classNames="question-transition"
              unmountOnExit
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="left"
                justifyContent="center"
                paddingLeft={6}
                paddingRight={6}
                // position="fixed"
                // bottom={0}
                // left={0}
                // right={0}
                // top={0}
                height="100vh"
                fontFamily="arial"
                margin={0}
                // border={1}
                sx={{
                  fontSize: [18],
                  overflow: "hidden",
                  '@media (max-width: 1000px)': {
                    fontSize: 16, padding: 0,
                  },
                  '@media (max-width: 700px)': {
                    fontSize: 16,
                    paddingLeft: 2,
                    paddingRight: 2,
                  },
                  '@media (max-width: 350px)': {
                    fontSize: 16,
                    paddingLeft: 1,
                    paddingRight: 1,
                  },
                }}
              >
                <Box mb={2.5}
                  // fontSize={23}
                  paddingLeft={20}
                  paddingRight={20}
                  // border={1}
                  sx={{
                    '@media (max-width: 1000px)': {
                      fontSize: 18,
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                    '@media (max-width: 700px)': {
                      fontSize: 16,
                      padding: 0,
                      paddingLeft: 2,
                      paddingRight: 2,
                    },
                    '@media (max-width: 350px)': {
                      fontSize: 15,
                      paddingLeft: 1,
                      paddingRight: 1,
                    },
                  }}
                >
                  {questions[currentQuestion][0]}
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="left"
                  justifyContent="center"
                  paddingLeft={20}
                  paddingRight={20}
                  // border={1}
                  sx={{
                    '@media (max-width: 1000px)': {
                      fontSize: 18,
                      padding: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                    '@media (max-width: 700px)': {
                      fontSize: 16,
                      paddingLeft: 2,
                      paddingRight: 2,
                    },
                    '@media (max-width: 350px)': {
                      fontSize: 14,
                      paddingLeft: 1,
                      paddingRight: 1,
                    },
                  }}
                >
                  {questions[currentQuestion][1] === "input" &&
                    (<TextField
                      variant="outlined"
                      // name={`questionInput${currentQuestion}`}
                      value={formData[`questionInput${currentQuestion}`] || ''}
                      onChange={handleInputChange}
                      size="small"
                      label={"Type your answer here..."}
                    />)}
                  {questions[currentQuestion][1] === "rating" &&
                    (<ButtonGroup fullWidth={true} variant="outlined" aria-label="outlined button group">
                      <Button key="1" onClick={() => handleRatingClick(1)}
                        style={{ backgroundColor: ratingClicked === 1 ? "rgb(4, 69, 175)" : "", transition: "background-color 0.3s", }}
                      >
                        1
                      </Button>
                      <Button key="2" onClick={() => handleRatingClick(2)}
                        style={{ backgroundColor: ratingClicked === 2 ? "rgb(4, 69, 175)" : "", transition: "background-color 0.3s", }}
                      >
                        2
                      </Button>
                      <Button key="3" onClick={() => handleRatingClick(3)}
                        style={{ backgroundColor: ratingClicked === 3 ? "rgb(4, 69, 175)" : "", transition: "background-color 0.3s", }}
                      >
                        3
                      </Button>
                      <Button key="4" onClick={() => handleRatingClick(4)}
                        style={{ backgroundColor: ratingClicked === 4 ? "rgb(4, 69, 175)" : "", transition: "background-color 0.3s", }}
                      >
                        4
                      </Button>
                      <Button key="5" onClick={() => handleRatingClick(5)}
                        style={{ backgroundColor: ratingClicked === 5 ? "rgb(4, 69, 175)" : "", transition: "background-color 0.3s", }}
                      >
                        5
                      </Button>
                    </ButtonGroup>
                    )}
                  {questions[currentQuestion][1] === "tick" &&
                    (<Box mt={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="left"
                      justifyContent="center"
                      textAlign="center"
                      sx={{
                        '@media (max-width: 1000px)': {
                          fontSize: 16,
                          marginTop: 1,
                        },
                        '@media (max-width: 700px)': {
                          fontSize: 16,
                          marginTop: 0,
                        },
                      }}
                    >
                      <Button startIcon={< DoneIcon />}
                        sx={{
                          backgroundColor: "rgb(4, 69, 175, 0.15)",
                          marginBottom: [1],
                          color: "rgb(4,95,167)",
                          border: [1],
                          width: [140],
                          height: 40,
                          fontSize: [18],
                          fontFamily: ['arial'],
                          '@media (max-width: 700px)': {
                            fontSize: 16,
                            width: 120,
                            height: 35,
                          },
                          '@media (max-width: 600px)': {
                            width: 120,
                            height: 35,
                            fontSize: 15,
                          },
                        }} variant="contained"
                        key="Yes" onClick={() => handleRatingClick("Yes")}
                        style={{ backgroundColor: ratingClicked === "Yes" ? "rgb(4, 69, 175)" : "", transition: "background-color 0.3s", }}
                      >
                        Yes
                      </Button>
                      <Button startIcon={<CloseIcon />}
                        sx={{
                          backgroundColor: "rgb(4, 69, 175, 0.15)",
                          color: ["rgb(4,95,167)"],
                          border: [1],
                          width: [140],
                          fontSize: [18],
                          height: 38,
                          fontFamily: ['arial'],
                          '@media (max-width: 700px)': {
                            fontSize: 16,
                            width: 120,
                            height: 35,
                          },
                          '@media (max-width: 600px)': {
                            width: 120,
                            height: 35,
                            fontSize: 15,
                          },
                        }} variant="contained"
                        key="No" onClick={() => handleRatingClick("No")}
                        style={{ backgroundColor: ratingClicked === "No" ? "rgb(4, 69, 175)" : "", transition: "background-color 0.3s", }}>
                        No
                      </Button>
                    </Box>
                    )}
                  <Box mt={2.5}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    textAlign="center"
                    justifyContent={
                      questions[currentQuestion][2] === "last" && isScreen1000OrLess ? "center" : "left"
                    }
                    sx={{
                      '@media (max-width: 1000px)': {
                        fontSize: questions[currentQuestion][2] === "last" ? 20 : 18,
                      },
                    }}
                  // border={1}
                  >
                    <Button
                      endIcon={questions[currentQuestion][2] !== "last" && <DoneIcon fontSize='large' />}
                      sx={{
                        paddingLeft: [2],
                        paddingRight: [2],
                        fontSize: [18],
                        fontWeight: ['bold'],
                        fontFamily: ['arial'],
                        color: "white",
                        backgroundColor: "rgb(4, 69, 175)",
                        '@media (max-width: 1000px)': {
                          fontWeight: questions[currentQuestion][2] === "last" ? "800" : "bold",
                        },
                        '@media (max-width: 700px)': {
                          fontSize: 15,
                          paddingLeft: 2,
                          paddingRight: 2,
                        },
                        '@media (max-width: 500px)': {
                          width: questions[currentQuestion][2] === "last" && "100%",
                        },
                        '@media (max-width: 350px)': {
                          paddingLeft: 1.5,
                          paddingRight: 1.5,
                        },
                      }}
                      variant="contained"
                      onClick={handleNextQuestion} >
                      {questions[currentQuestion][2] === "last" ? "Submit" : "OK"}
                    </Button>
                    {questions[currentQuestion][2] !== "last" && (
                      <Box
                        sx={{
                          padding: [1],
                          fontSize: [16],
                          '@media (max-width: 700px)': {
                            fontSize: 14,
                          },
                        }}
                      >
                        click here ↵
                      </Box>
                    )}

                  </Box>
                </Box>
              </Box>
            </CSSTransition>
          )}
        </TransitionGroup>
      </ThemeProvider>
    </>
  );
}


export default Form;
