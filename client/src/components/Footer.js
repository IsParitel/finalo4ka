import React from 'react';
import './footer.css'; 
import './../index.css'; 
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container>
      <footer>
        <div className='footer'>
          {/* Колонка 1 */}
          <div>
            <h4 className="footer-heading">Студентам</h4>
            <ul className="footer-list">
              <li><a className="footer-list-link" href="#">Стажировки</a></li>
              <li><a className="footer-list-link" href="#">Компании</a></li>
              <li><a className="footer-list-link" href="#">Прайс-лист</a></li>
              <li><a className="footer-list-link" href="#">Менторы</a></li>
              <li><a className="footer-list-link" href="#">Обратная связь</a></li>
            </ul>
          </div>
          {/* Колонка 2 */}
          <div>
            <h4 className="footer-heading">Организациям</h4>
            <ul className="footer-list">
              <li><a className="footer-list-link" href="#">Разместить вакансии</a></li>
              <li><a className="footer-list-link" href="#">Найти сотрудников</a></li>
              <li><a className="footer-list-link" href="#">Помощь работодателям</a></li>
            </ul>
          </div>
          {/* Колонка 3 */}
          <div>
            <h4 className="footer-heading">Информация</h4>
            <ul className="footer-list">
              <li><a className="footer-list-link" href="#">О нас</a></li>
              <li><a className="footer-list-link" href="#">Правила сайта</a></li>
              <li><a className="footer-list-link" href="#">Политика обработки перс. данных</a></li>
              <li><a className="footer-list-link" href="#">Контакты</a></li>
              <li><a className="footer-list-link" href="#">Работа для менторов</a></li>
            </ul>
          </div>
          {/* Колонка 4 */}
          <div>
            <h4 className="footer-heading">Мобильное приложение:</h4>
            <div className='footer-mobile'>
              <a href="#">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className='footer-mobile-link'
                />
              </a>
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className='footer-mobile-link'
                />
              </a>
            </div>
          </div>
        </div>
        {/* Копирайт */}
        <div className='footer'>
          <p className='footer-copyright'>
            На информационном ресурсе SkillHorizon.ru применяются рекомендательные технологии, основанные на сборе,
            систематизации и анализе сведений о предпочтениях пользователей сети «Интернет», находящихся на территории
            Российской Федерации. <br /> © 2024
          </p>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
