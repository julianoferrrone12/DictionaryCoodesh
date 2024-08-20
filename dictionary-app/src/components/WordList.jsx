import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getWordDetails, getWords, favoriteWord, getFavoritesWords, unfavoriteWord } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const WordList = () => {
    const dispatch = useDispatch();
    const [words, setWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const [wordDetails, setWordDetails] = useState(null);
    const [audioPlayer, setAudioPlayer] = useState(null);
    const [playingAudioUrl, setPlayingAudioUrl] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadWords = async () => {
            try {
                const data = await getWords(searchTerm, currentPage);
                if (data && Array.isArray(data.results)) {
                    setWords(data.results);
                    setTotalPages(data.totalPages);
                } else {
                    console.error('Data.results is not an array:', data);
                }
            } catch (error) {
                console.error('Failed to load words:', error);
            }
        };

        const loadFavorites = async () => {
            try {
                const data = await getFavoritesWords();
                setFavorites(new Set(data.map(item => item.word)));
            } catch (error) {
                console.error('Failed to load favorites:', error);
            }
        };

        loadWords();
        loadFavorites();
    }, [dispatch, currentPage, searchTerm]);

    const handleWordClick = async (word) => {
        if (selectedWord === word) {
            setSelectedWord(null);
            setWordDetails(null);
            setPlayingAudioUrl(null);
            if (audioPlayer) {
                audioPlayer.pause();
                setAudioPlayer(null);
            }
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

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <div style={styles.searchContainer}>
                <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search words..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {words.map((item, index) => (
                    <li key={index} style={styles.listItem}>
                        <div style={styles.itemContent}>
                            <div style={styles.itemLeft}></div>
                            <div style={styles.itemDetails}>
                                <div style={styles.itemActions}>
                                    <span onClick={() => handleWordClick(item)} style={styles.wordText}>
                                        {item}
                                    </span>
                                    <FontAwesomeIcon
                                        icon={favorites.has(item) ? faStarSolid : faStarRegular}
                                        onClick={() => handleFavoriteClick(item)}
                                        style={{
                                            color: favorites.has(item) ? '#FF914D' : '#9E9E9E',
                                            cursor: 'pointer',
                                            fontSize: '24px',
                                            padding: '2px',
                                        }}
                                    />
                                    {selectedWord === item && wordDetails && wordDetails.phonetics && wordDetails.phonetics.length > 0 && (
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
                                {selectedWord === item && wordDetails && (
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
                ))}
            </ul>
            <div style={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        ...styles.pageButton,
                        ...(currentPage === 1 ? styles.pageButtonDisabled : {}),
                        ...(currentPage !== 1 ? styles.pageButtonHover : {}),
                    }}
                >
                    Previous
                </button>
                <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={styles.pageButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const styles = {
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f1f1f1',
        borderRadius: '5px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    searchIcon: {
        marginRight: '10px',
        color: '#9E9E9E',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
    },
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
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    pageButton: {
        margin: '0 10px',
        padding: '10px 20px',
        backgroundColor: '#B46636',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    pageButtonHover: {
        backgroundColor: '#9A5930',
    },
    pageButtonDisabled: {
        backgroundColor: '#E5C4B2',
        cursor: 'not-allowed',
    },
    pageInfo: {
        margin: '0 10px',
        fontSize: '16px',
    },
};

export default WordList;
