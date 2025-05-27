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
                maxWidth: '703px',
                height: '238px',
                borderRadius: '26px',
                border: '1px solid #00000010',
                padding: '26px',
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                cursor: 'pointer',
                marginBottom:'20px'
            }}
        >
            {/* Левая часть: Изображение */}
            <div
                style={{
                    width: '81px',
                    height: '81px',
                    borderRadius: '15px',
                    backgroundColor: '#000',
              }}
            >
            <Image
                src={imageUrl}
                alt={job_page?.name || 'Image not available'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
            />
            </div>
              
            {/* Правая часть: Текст */}
            <div
              style={{
                fontWeight: '900',
                fontSize: '20px',
              }}
              title={job_page?.name}
            >
              {splitTextByWords(job_page?.name, 32)}
            </div>
        </Card>
    );
};

export default JobPageItem;