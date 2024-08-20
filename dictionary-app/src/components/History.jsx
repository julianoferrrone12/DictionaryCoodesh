import React, { useEffect, useState } from 'react';
import { getVisitedWords, favoriteWord, getFavoritesWords, unfavoriteWord, getWordDetails } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const History = () => {
    const [history, setHistory] = useState([]);
    const [status, setStatus] = useState('idle');
    const [selectedWord, setSelectedWord] = useState(null);
    const [wordDetails, setWordDetails] = useState(null);
    const [audioPlayer, setAudioPlayer] = useState(null);
    const [playingAudioUrl, setPlayingAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        const fetchHistory = async () => {
            setStatus('loading');
            try {
                const data = await getVisitedWords();
                setHistory(data);
                setStatus('succeeded');
            } catch (err) {
                console.error('Failed to fetch history words', err);
                setError(err.message);
                setStatus('failed');
            }
        };

        const fetchFavorites = async () => {
            try {
                const data = await getFavoritesWords();
                setFavorites(new Set(data.map(item => item.word)));
            } catch (error) {
                console.error('Failed to load favorites:', error);
            }
        };

        fetchHistory();
        fetchFavorites();
    }, []);

    const handleWordClick = async (word) => {
        if (selectedWord === word) {
            setSelectedWord(null);
            setWordDetails(null);
            return;
        }

        setSelectedWord(word);
        try {
            const details = await getWordDetails(word);
            setWordDetails(details);
        } catch (error) {
            console.error('Failed to fetch word details:', error);
        }
    };

    const handleAudioPlayPause = (audioUrl) => {
        if (audioPlayer && playingAudioUrl === audioUrl) {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        } else {
            if (audioPlayer) {
                audioPlayer.pause();
            }
            const audio = new Audio(audioUrl);
            audio.addEventListener('ended', () => {
                setPlayingAudioUrl(null);
            });
            setAudioPlayer(audio);
            setPlayingAudioUrl(audioUrl);
            audio.play();
        }
    };


    const handleFavoriteClick = async (word) => {
        const isFavorite = favorites.has(word);

        try {
            if (isFavorite) {
                await unfavoriteWord(word);
                setFavorites(prevFavorites => {
                    const newFavorites = new Set(prevFavorites);
                    newFavorites.delete(word);
                    return newFavorites;
                });
                alert(`Word '${word}' has been removed from favorites.`);
            } else {
                await favoriteWord(word);
                setFavorites(prevFavorites => new Set(prevFavorites).add(word));
                alert(`Word '${word}' has been added to favorites.`);
            }
        } catch (error) {
            console.error('Failed to update the favorite word:', error);
            alert('Failed to update the favorite word.');
        }
    };

    let content;

    if (status === 'loading') {
        content = <p>Loading...</p>;
    } else if (status === 'succeeded') {
        content = (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {history.length > 0 ? (
                    history.map((item, index) => (
                        <li key={index} style={styles.listItem}>
                            <div style={styles.itemContent}>
                                <div style={styles.itemLeft}></div>
                                <div style={styles.itemDetails}>
                                    <div style={styles.itemActions}>
                                        <span onClick={() => handleWordClick(item.word)} style={styles.wordText}>
                                            {item.word}
                                        </span>
                                        <FontAwesomeIcon
                                            icon={faStarSolid}
                                            onClick={() => handleFavoriteClick(item.word)}
                                            style={{
                                                color: '#FF914D',
                                                cursor: 'pointer',
                                                fontSize: '24px',
                                                padding: '2px',
                                            }}
                                        />
                                        {selectedWord === item.word && wordDetails && wordDetails.phonetics && wordDetails.phonetics.length > 0 && (
                                            wordDetails.phonetics.map((phonetic, index) => (
                                                phonetic.audio && (
                                                    <FontAwesomeIcon
                                                        key={index}
                                                        icon={playingAudioUrl === phonetic.audio ? (audioPlayer && !audioPlayer.paused ? faPause : faPlay) : faPlay}
                                                        onClick={() => handleAudioPlayPause(phonetic.audio)}
                                                        style={styles.audioButton}
                                                    />
                                                )
                                            ))
                                        )}
                                    </div>
                                    {selectedWord === item.word && wordDetails && (
                                        <div style={styles.wordDetails}>
                                            <h2 style={styles.wordTitle}>{wordDetails.word || "Word not available"}</h2>
                                            <p style={styles.phonetics}>
                                                {wordDetails.phonetics && wordDetails.phonetics.length > 0 ? (
                                                    wordDetails.phonetics.map((phonetic, index) => (
                                                        <span key={index} style={styles.phoneticText}>
                                                            {phonetic.text && <><strong>Phonetic:</strong> {phonetic.text} </>}
                                                            {index < wordDetails.phonetics.length - 1 && ', '}
                                                        </span>
                                                    ))
                                                ) : (
                                                    'Phonetic information not available.'
                                                )}
                                            </p>
                                            <p style={styles.meanings}>
                                                {wordDetails.meanings && wordDetails.meanings.length > 0 ? (
                                                    wordDetails.meanings.map((meaning, index) => (
                                                        <span key={index}>
                                                            <strong>{meaning.partOfSpeech}:</strong>
                                                            {meaning.definitions.map((def, i) => (
                                                                <span key={i}>
                                                                    {' '}
                                                                    <strong>Definition:</strong> {def.definition}
                                                                    {i < meaning.definitions.length - 1 && ', '}
                                                                </span>
                                                            ))}
                                                            {index < wordDetails.meanings.length - 1 && '; '}
                                                        </span>
                                                    ))
                                                ) : (
                                                    'Meanings not available.'
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No words visualised.</p>
                )}
            </ul>
        );
    }


    return (
        <div>
            {content}
        </div>
    );
};

const styles = {
    listItem: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        borderLeft: '5px solid #FF914D',
        paddingLeft: '10px',
    },
    itemContent: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    itemLeft: {
        width: '5px',
        backgroundColor: '#FF914D',
        height: '100%',
    },
    itemDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    itemActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    wordText: {
        fontSize: '18px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    favoriteIcon: {
        fontSize: '20px',
        color: '#FF914D',
        cursor: 'pointer',
    },
    audioButton: {
        fontSize: '23px',
        cursor: 'pointer',
        marginRight: '10px',
        color: '#B46636'
    },
    wordDetails: {
        marginTop: '10px',
        marginLeft: '20px',
    },
};

export default History;
