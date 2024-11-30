import { Image, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { JOB_PAGE_ROUTE } from "../utils/consts";

const JobPageItem = ({ job_page }) => {
    const navigate = useNavigate();

    if (!job_page) {
        return <div>Вакансия не найдена</div>;
    }

    const imageUrl = job_page.img
        ? process.env.REACT_APP_API_URL + job_page.img
        : 'https://via.placeholder.com/150';

    const splitTextByWords = (text, maxLength) => {
        if (!text) return '';
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach((word) => {
            if ((currentLine + word).length <= maxLength) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines.join('\n');
    };

    return (
        <Card
            onClick={() => navigate(JOB_PAGE_ROUTE + '/' + job_page.id)}
            style={{
                width: '100%',
                maxWidth: '800px',
                margin: '15px auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '15px',
                display: 'flex',
                height: '300px',
                overflow: 'hidden',
                position: 'relative',
                background: 'rgba(255,255,255,0.2)',
            }}
        >
            {/* Левая часть: Изображение */}
            <div
                style={{
                    width: '150px',
                    height: '150px',
                    margin: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid #6c757d',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa',
                }}
            >
                <Image
                    src={imageUrl}
                    alt={job_page?.name || "Image not available"}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>

            {/* Правая часть: Текст */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '15px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        color: 'rgba(0,0,0,0.65)',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        marginBottom: '10px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        overflowWrap: 'break-word',
                    }}
                    title={job_page?.name}
                >
                    {splitTextByWords(job_page?.name, 32)}
                </div>
            </div>

            {/* Вторая карточка */}
            <Card
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '50%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.28)',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    transition: 'all 0.3s ease',
                }}
            >
                <div
                    style={{
                        fontSize: '14px',
                        color: 'rgba(0,0,0,0.65)',
                        textAlign: 'center',
                    }}
                >
                    Здесь будет дополнительная информация о вакансии.
                </div>
            </Card>
        </Card>
    );
};

export default JobPageItem;

