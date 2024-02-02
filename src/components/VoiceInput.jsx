import { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    CircularProgress,
    Textarea,
    Text,
    Grid,
    Button,
    TableCell,
    TableRow,
    TableContainer, Table, TableHead, TableBody,
    Card
} from "@material-tailwind/react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const utteranceToCommand = {
    'forward': 'Forward',
    'move ahead': 'Forward',
    'straight ahead': 'Forward',
    'go back': 'Backward',
    'move backward': 'Backward',
    'reverse': 'Backward',
    'rivers': 'Backward',
    'turn left': 'Left',
    'go left': 'Left',
    'turn right': 'Right',
    'go right': 'Right',
    'proceed straight': 'Forward',
};

const SpeechToTextComponent = () => {

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    const [transcript, setTranscript] = useState('');
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const [mongoData, setMongoData] = useState([]);
    const [expressData, setExpressData] = useState([]);
    const [flaskData, setFlaskData] = useState([]);

    const startRecognition = () => {
        if (recognitionRef.current && !isListening) {
            setLoading(true);
            setIsListening(true);
            recognitionRef.current.start();
            setTimeout(stopRecognition, 3000); // Automatically stop after 3 seconds
        } else {
            setResponseText('Speech recognition is already running');
        }
    };

    const stopRecognition = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const sendPostRequest = useCallback(async (command) => {
        try {
            setLoading(false);
            const response = await axios.post('http://localhost:5000/example', { direction: command });
            const { mongoData, expressData, flaskData } = response.data;
            setMongoData(mongoData);
            setExpressData(expressData);
            setFlaskData(flaskData);
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    }, []);

    const handleFinalResult = useCallback((utterance) => {
        console.log(`Received utterance: ${utterance}`);

        const correctedUtterance = utterance.toLowerCase().trim();

        const command = utteranceToCommand[correctedUtterance];
        if (command) {
            console.log(`Sending command: ${command}`);
            sendPostRequest(command);
        } else {
            setResponseText(`Unrecognized command: ${utterance}`);
        }
    }, [sendPostRequest, setResponseText]);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            setResponseText('Speech recognition not supported in this browser');
            return;
        }

        const createRecognitionInstance = () => {
            const recognition = new window.webkitSpeechRecognition();
            recognition.interimResults = true;
            recognition.continuous = true;

            recognition.onresult = (event) => {
                const lastResult = event.results[event.results.length - 1];
                const utterance = lastResult[0].transcript;
                const confidence = lastResult[0].confidence;

                if (confidence > 0.7) {
                    setTranscript(utterance);

                    if (lastResult.isFinal) {
                        handleFinalResult(utterance);
                    }
                } else {
                    setResponseText(`Low confidence: ${utterance}`);
                }
            };

            recognition.onerror = (event) => {
                setResponseText(`Speech recognition error: ${event.error}`);
            };

            recognition.onnomatch = () => {
                setResponseText('No match for speech input');
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        };

        createRecognitionInstance();

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, [handleFinalResult, setResponseText]);


    return (
        <div className="container-fluid home-background d-flex align-items-center justify-content-center">
            <div className="card p-5 shadow-lg rounded card-background card-big" data-aos="fade-up">
                <div className="card-body text-center">
                    <Text variant="h5" component="h2" align="center" gutterBottom>
                        Speech to Text
                    </Text>
                    <Text variant="subtitle1" gutterBottom>
                        Transcript
                    </Text>
                    <Textarea minRows={3} maxRows={6} className="form-input" readOnly value={transcript} />
                    <Text variant="subtitle1" gutterBottom>
                        Express Data
                    </Text>
                    <Textarea minRows={3} maxRows={6} className="form-input" readOnly value={JSON.stringify(expressData)} />
                    <Text variant="subtitle1" gutterBottom>
                        Flask Data
                    </Text>
                    <Textarea minRows={3} maxRows={6} className="form-input" readOnly value={JSON.stringify(flaskData)} />
                    {loading && (
                        <Grid container justifyContent="center">
                            <CircularProgress color="primary" />
                        </Grid>
                    )}
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
                            <Card mt={4} mr={4}>
                                <Button color="primary" aria-label="start" onClick={startRecognition} className="transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </Button>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card mt={4} ml={4}>
                                <Button color="secondary" aria-label="stop" onClick={stopRecognition} className="transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </Button>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Card className="card p-5 shadow-lg rounded card-background ml-5" data-aos="fade-up">
                <div className="card-body">
                    <h2 className="card-title mb-4">MongoDB Data</h2>
                    <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                        <TableContainer component={Card}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Direction</TableCell>
                                        <TableCell>Timestamp</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mongoData.map((doc, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{doc._id}</TableCell>
                                            <TableCell>{doc.direction}</TableCell>
                                            <TableCell>{doc.timestamp}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SpeechToTextComponent;