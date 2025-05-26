import React, { useContext, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, ListGroup, Button, FormControl } from "react-bootstrap";
import { fetchOtrasls, fetchSpecials } from "../http/job_pageAPI";

const FilterBar = observer(() => {
    const { job_page } = useContext(Context);
    const [expandedOtraslId, setExpandedOtraslId] = useState(null);
    const [selectedSpecial, setSelectedSpecial] = useState(null);
    const [otrasls, setOtrasls] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [filteredSpecialties, setFilteredSpecialties] = useState([]);

    useEffect(() => {
        fetchOtrasls().then(setOtrasls);
    }, []);

    useEffect(() => {
        if (expandedOtraslId) {
            fetchSpecials(expandedOtraslId).then((data) => {
                setSpecialties(data);
                setFilteredSpecialties(data);
            });
        }
    }, [expandedOtraslId]);

    const handleOtraslClick = (otrasl) => {
        if (expandedOtraslId === otrasl.id) {
            setExpandedOtraslId(null);
        } else {
            setExpandedOtraslId(otrasl.id);
        }
        job_page.setSelectedOtrasl(otrasl);
    };

    const handleSpecialClick = (special) => {
        const newSpecial = special.id === selectedSpecial?.id ? null : special;
        setSelectedSpecial(newSpecial);
        job_page.setSelectedSpecial(newSpecial);
    };

    const resetFilters = () => {
        setSelectedSpecial(null);
        job_page.clearFilters();
    };

    const filterSpecialties = (searchTerm) => {
        const filtered = specialties.filter((special) =>
            special.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSpecialties(filtered);
    };

    return (
        <Card
            style={{
                padding: '20px',
                borderRadius: '15px',
                border: 'none',
                boxShadow: '0 15px 15px #66666615',
                fontFamily: 'Kumbh Sans',
            }}
        >
            <h5 style={{ fontWeight: '700', fontSize: '18px', marginBottom: '15px' }}>Фильтры по отраслям</h5>
            <ListGroup variant="flush">
                {otrasls.map((otrasl) => (
                    <div key={otrasl.id}>
                        <ListGroup.Item
                            onClick={() => handleOtraslClick(otrasl)}
                            active={job_page.selectedOtrasl?.id === otrasl.id}
                            style={{
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '15px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '10px 0',
                                color: '#303030',
                            }}
                        >
                            {otrasl.name}
                        </ListGroup.Item>

                        {expandedOtraslId === otrasl.id && (
                            <div style={{ paddingLeft: '15px', transition: 'all 0.3s ease' }}>
                                <FormControl
                                    placeholder="Поиск специализации"
                                    onChange={(e) => filterSpecialties(e.target.value)}
                                    style={{
                                        marginBottom: '10px',
                                        fontSize: '13px',
                                        borderRadius: '10px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                                {filteredSpecialties.map((special) => (
                                    <ListGroup.Item
                                        key={special.id}
                                        onClick={() => handleSpecialClick(special)}
                                        active={selectedSpecial?.id === special.id}
                                        style={{
                                            cursor: 'pointer',
                                            paddingLeft: '20px',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            fontSize: '14px',
                                            fontWeight: selectedSpecial?.id === special.id ? '700' : '400',
                                            color: selectedSpecial?.id === special.id ? '#007bff' : '#666',
                                        }}
                                    >
                                        {special.name}
                                    </ListGroup.Item>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </ListGroup>

            <Button
                variant="outline-danger"
                onClick={resetFilters}
                className="mt-3 w-100"
                style={{
                    fontWeight: '600',
                    borderRadius: '10px',
                    fontSize: '14px',
                    padding: '8px 0',
                }}
            >
                Сбросить фильтры
            </Button>
        </Card>
    );
});

export default FilterBar;
