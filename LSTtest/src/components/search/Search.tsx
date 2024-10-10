import search from './search.module.css';
import { useState } from 'react';

interface Suggestions {
  value: string;
  unrestricted_value: string;
  data: {
    postal_code?: string;
    region_with_type?: string;
    city?: string;
    city_with_type?: string;
    area_with_type?: string;
    street_with_type?: string;
    settlement_with_type?: string;
    house?: string;
    block?: string;
    flat?: string;
  };
}

const Search: React.FC = () => {
  const [index, setIndex] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [settlement, setSettlement] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [block, setBlock] = useState('');
  const [flat, setFlat] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);

  const addressSearching = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const token = 'dc3a7d155cb6dbaaa463850ef2dfb8e470ccd8ee';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ query }),
    };

    try {
      const response = await fetch(
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        options,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={search.container}>
      <div className={search.inputSearch}>
        <input
          type="text"
          value={searchAddress}
          onChange={(e) => {
            setSearchAddress(e.target.value);
            addressSearching(e.target.value);
          }}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className={search.suggestionsList}>
          {suggestions.map((item) => (
            <li
              key={item.value}
              onClick={() => {
                setSearchAddress(item.unrestricted_value);
                setIndex(item.data.postal_code || '');
                setRegion(item.data.region_with_type || '');
                setSettlement(item.data.area_with_type || '');
                setCity(item.data.city_with_type || '');
                setDistrict(item.data.city || item.data.area_with_type || '');
                setStreet(
                  item.data.street_with_type ||
                    item.data.settlement_with_type ||
                    '',
                );
                setHouse(item.data.house || '');
                setBlock(item.data.block || '');
                setFlat(item.data.flat || '');
                setSuggestions([]);
              }}
            >
              {item.unrestricted_value}
            </li>
          ))}
        </ul>
      )}

      <div className={search.containerSearch}>
        <div>
          <p>Индекс:</p>
          <input
            type="text"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
        </div>

        <div>
          <p>Регион:</p>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        <div>
          <p>Район:</p>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>

        <div>
          <p>Город:</p>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <p>Населенный пункт:</p>
          <input
            type="text"
            value={settlement}
            onChange={(e) => setSettlement(e.target.value)}
          />
        </div>

        <div>
          <p>Улица:</p>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div>
          <p>Дом:</p>
          <input
            type="text"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          />
        </div>

        <div>
          <p>Корпус:</p>
          <input
            type="text"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
          />
        </div>

        <div>
          <p>Квартира:</p>
          <input
            type="text"
            value={flat}
            onChange={(e) => setFlat(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
