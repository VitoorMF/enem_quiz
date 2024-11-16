import React, { useState, useEffect } from 'react';
import '../quiz/QuizPage.css';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
    const [question, setQuestion] = useState(null); // Para armazenar a questão
    const [showQuestion, setShowQuestion] = useState(false); // Controla a exibição da questão
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Para armazenar a resposta selecionada
    const [feedback, setFeedback] = useState(null); // Para exibir o resultado (correto/incorreto)
    const [loading, setLoading] = useState(false); // Estado para carregamento
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };

    // Função para lidar com a mudança na seleção
    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value); // Atualiza a resposta selecionada
        // Verifica a resposta imediatamente após a seleção
        const selectedAlternative = event.target.value;
        if (selectedAlternative === question.correctAlternative) {
            setFeedback(<p>Boaa!!<br/> Você acertou 🎉🎉</p>);
        } else {
            setFeedback(<p>Que pena!!<br/>Você errou. 😔</p>);
        }
        setIsModalOpen(true); // Abre o modal com o feedback
    };

    // Função para buscar uma questão
    const fetchQuestion = async () => {
        setLoading(true); // Ativa o estado de carregamento
        const year = Math.floor(Math.random() * (2023 - 2009 + 1)) + 2009;
        const questionNumber = Math.floor(Math.random() * (160 - 5 + 1)) + 5;

        const url = `https://api.enem.dev/v1/exams/${year}/questions/${questionNumber}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao buscar a questão: ${response.status}`);
            }
            const data = await response.json();
            setQuestion(data);
            setShowQuestion(true); // Mostra a questão
        } catch (error) {
            console.error('Erro ao carregar a questão:', error);
        } finally {
            setLoading(false); // Desativa o estado de carregamento
        }
    };

    // Carrega uma questão automaticamente ao montar o componente
    useEffect(() => {
        fetchQuestion();
    }, []);

    const closeModal = () => {
        setIsModalOpen(false); // Fecha o modal
        setSelectedAnswer(null); // Reseta a seleção
    };

    return (
        <div className='questionModule'>
            {/* Exibe mensagem de carregamento */}
            {loading && <p>Carregando questão...</p>}

            {/* Exibe questão se disponível */}
            {showQuestion && question && (
                <div className='question'>
                    <h2>{question.title}</h2>
                    <p>{question.context}</p>

                    {/* Exibe imagem da questão, se disponível */}
                    {question.files && question.files.length > 0 && (
                        <img
                            src={question.files[0]}
                            alt="Ilustração da questão"
                            style={{ maxWidth: '1000px', height: 'auto' }}
                        />
                    )}

                    <p className='alternativesIntroduction'>{question.alternativesIntroduction}</p>

                    <form>
                        {question.alternatives.map((alt) => {
                            const isSelected = selectedAnswer === alt.letter; // Verifica se a alternativa foi selecionada
                            const buttonClass = isSelected ? (alt.isCorrect ? 'correct' : 'incorrect') : ''; // Aplica a classe de cor baseada na resposta

                            return (
                                <div key={alt.letter} className="inpete">
                                    <input
                                        className="inpot"
                                        type="radio"
                                        id={alt.letter}
                                        name="answer"
                                        value={alt.letter}
                                        onChange={handleAnswerChange} // Lida com a mudança sem submeter
                                    />
                                    <label
                                        htmlFor={alt.letter}
                                        className={buttonClass} // Aplica a classe de cor no botão
                                    >
                                        {alt.text}
                                    </label>
                                </div>
                            );
                        })}
                    </form>
                </div>
            )}

            {/* Modal de feedback */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{feedback}</p>
                        <button onClick={goToHomePage} className="homeBtn">
                            <img src="/home.png" 
                            alt="Home"
                            style={{ maxWidth: '40px', height: 'auto' }} />
                            
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizPage;

