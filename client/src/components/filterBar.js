import React, { useContext, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, ListGroup, Button, FormControl } from "react-bootstrap";
import { fetchOtrasls, fetchSpecials } from "../http/job_pageAPI";

const FilterBar = observer(() => {
    const { job_page } = useContext(Context);
    const [expandedOtraslIds, setExpandedOtraslIds] = useState([]);
    const [selectedSpecials, setSelectedSpecials] = useState([]);
    const [otrasls, setOtrasls] = useState([]);
    const [allSpecialties, setAllSpecialties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchOtrasls().then(async (otraslData) => {
            setOtrasls(otraslData);

            const allSpecs = [];
            for (const o of otraslData) {
                const specs = await fetchSpecials(o.id);
                allSpecs.push(...specs.map(s => ({ ...s, otraslId: o.id })));
            }
            setAllSpecialties(allSpecs);
        });
    }, []);

const handleOtraslClick = (otrasl) => {
    if (expandedOtraslIds.includes(otrasl.id)) {
        setExpandedOtraslIds(expandedOtraslIds.filter(id => id !== otrasl.id));
    } else {
        setExpandedOtraslIds([...expandedOtraslIds, otrasl.id]);
    }
    job_page.setSelectedOtrasl(otrasl);
};

    const handleSpecialClick = (special) => {
        const alreadySelected = selectedSpecials.some(s => s.id === special.id);
        const updated = alreadySelected
            ? selectedSpecials.filter(s => s.id !== special.id)
            : [...selectedSpecials, special];

        setSelectedSpecials(updated);
        job_page.setSelectedSpecial(updated);
    };

    const resetFilters = () => {
        setSelectedSpecials([]);
        job_page.clearFilters();
    };

    const filteredBySearch = (otraslId) => {
        return allSpecialties.filter(s =>
            s.otraslId === otraslId &&
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <Card
            style={{
                width: '351px',
                padding: '20px',
                borderRadius: '15px',
                border: 'none',
                boxShadow: '0 15px 15px #66666615',
                backgroundColor: '#fff'
            }}
        >
            <h5 style={{ fontWeight: '700', fontSize: '18px', marginBottom: '15px' }}>Фильтры по отраслям</h5>

            <FormControl
                placeholder="Поиск по всем специализациям"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    marginBottom: '15px',
                    fontSize: '13px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                }}
            />

            <ListGroup style={{ border: 'none' }} variant="flush">
                {otrasls.map((otrasl) => {
                    const isExpanded = expandedOtraslIds.includes(otrasl.id);
                    const specialties = filteredBySearch(otrasl.id);

                    return (
                        <div key={otrasl.id} style={{ backgroundColor: '#fff', borderRadius: '10px', marginBottom: '5px' }}>
                            <div
                                onClick={() => handleOtraslClick(otrasl)}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '15px',
                                    padding: '10px 12px',
                                    color: '#303030',
                                    backgroundColor: '#fff',
                                    border: 'none',
                                }}
                            >
                                <span
                                    style={{
                                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease',
                                        marginRight: '6px',
                                        display: 'inline-block',
                                    }}
                                >
                                    &gt;
                                </span>
                                {otrasl.name}
                            </div>

                            <div
                                style={{
                                    maxHeight: isExpanded ? 1000 : 0,
                                    overflow: 'hidden',
                                    transition: 'max-height 0.3s ease',
                                    paddingLeft: '20px',
                                    backgroundColor: '#fff'
                                }}
                            >
                                {isExpanded && specialties.map((special) => {
                                    const isSelected = selectedSpecials.some(s => s.id === special.id);
                                    return (
                                        <ListGroup.Item
                                            key={special.id}
                                            onClick={() => handleSpecialClick(special)}
                                            style={{
                                                cursor: 'pointer',
                                                paddingLeft: '10px',
                                                backgroundColor: isSelected ? '#e6f0ff' : '#fff',
                                                border: 'none',
                                                fontSize: '14px',
                                                fontWeight: isSelected ? '700' : '400',
                                                color: isSelected ? '#007bff' : '#666',
                                                borderRadius: '5px',
                                                marginBottom: '3px'
                                            }}
                                        >
                                            {special.name}
                                        </ListGroup.Item>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
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
