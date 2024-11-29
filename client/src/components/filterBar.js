import React, { useContext, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup, Button} from "react-bootstrap";
import { fetchOtrasls, fetchSpecials } from "../http/job_pageAPI";
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterBar = observer(() => {
    const { job_page } = useContext(Context);
    const [showFilters, setShowFilters] = useState(false);
    const [expandedOtraslId, setExpandedOtraslId] = useState(null);
    const [selectedSpecial, setSelectedSpecial] = useState(null);
    const [otrasls, setOtrasls] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [filteredSpecialties, setFilteredSpecialties] = useState([]);

    const NAVBAR_HEIGHT = 56;
    const MAX_LIST_HEIGHT = 'calc(100vh - ' + NAVBAR_HEIGHT + 'px)';

    useEffect(() => {
        fetchOtrasls().then((data) => {
            setOtrasls(data);
        });
    }, []);

    useEffect(() => {
        if (expandedOtraslId) {
            fetchSpecials(expandedOtraslId).then((data) => {
                setSpecialties(data);
                setFilteredSpecialties(data);
            });
        }
    }, [expandedOtraslId]);

    const filterSpecialties = (searchTerm) => {
        const filtered = specialties.filter((special) =>
            special.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSpecialties(filtered);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleOtraslClick = (otrasl) => {
        if (expandedOtraslId === otrasl.id) {
            setExpandedOtraslId(null);
        } else {
            setExpandedOtraslId(otrasl.id);
        }
        job_page.setSelectedOtrasl(otrasl);
    };

    const handleSpecialClick = (special) => {
        setSelectedSpecial(special.id === selectedSpecial?.id ? null : special);
        job_page.setSelectedSpecial(special);
    };

    // Сброс фильтров
    const resetFilters = () => {
        setSelectedSpecial(null);
        job_page.clearFilters();
    };

    return (
        <>
            {/* Плавающая кнопка */}
            <Button
                onClick={toggleFilters}
                style={{
                    position: 'fixed',
                    top: showFilters ? NAVBAR_HEIGHT + 10 + 'px' : 'auto',
                    bottom: showFilters ? 'auto' : '20px',
                    left: showFilters ? '230px' : 'auto',
                    right: showFilters ? 'auto' : '20px',
                    transform: showFilters ? 'translateX(-50%)' : 'none',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    backgroundColor: showFilters ? '#dc3545' : '#007bff',
                    color: 'white',
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1050,
                    transition: 'all 0.3s ease',
                }}
            >
                {showFilters ? '✕' : '≡'}
            </Button>

            {/* Список фильтров */}
            <div
                style={{
                    width: '250px',
                    position: 'fixed',
                    top: NAVBAR_HEIGHT + 'px',
                    left: '0',
                    height: MAX_LIST_HEIGHT,
                    overflowY: 'auto',
                    background: '#f8f9fa',
                    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
                    zIndex: 1040,
                    transform: showFilters ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                }}
            >
                <ListGroup>
                    {otrasls.map((otrasl) => (
                        <div key={otrasl.id}>
                            {/* Отображаем отрасль */}
                            <ListGroup.Item
                                active={otrasl.id === job_page.selectedOtrasl?.id}
                                onClick={() => handleOtraslClick(otrasl)}
                                style={{ cursor: 'pointer' }}
                            >
                                {otrasl.name}
                            </ListGroup.Item>

                            {/* Если отрасль выбрана, показываем список специальностей */}
                            <div
                                style={{
                                    maxHeight: expandedOtraslId === otrasl.id ? '300px' : '0',
                                    overflowY: 'auto', // Скролл внутри
                                    transition: 'max-height 0.3s ease',
                                }}
                            >
                                {filteredSpecialties.map((special) => (
                                    <ListGroup.Item
                                        key={special.id}
                                        active={special.id === selectedSpecial?.id}
                                        onClick={() => handleSpecialClick(special)}
                                        style={{
                                            cursor: 'pointer',
                                            paddingLeft: '30px',
                                        }}
                                    >
                                        {special.name}
                                    </ListGroup.Item>
                                ))}
                            </div>
                        </div>
                    ))}
                </ListGroup>

                {/* Кнопка сброса фильтров */}
                <Button variant="outline-danger" onClick={resetFilters} style={{ marginTop: '10px' }}>
                    Сбросить фильтры
                </Button>
            </div>
        </>
    );
});

export default FilterBar;
