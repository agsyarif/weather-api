# Weather API

Weather API adalah aplikasi Node.js yang menyediakan informasi cuaca berdasarkan lokasi dan rentang tanggal yang diberikan. API ini menggunakan Redis untuk caching data cuaca agar lebih cepat dan efisien.

## Fitur

- Mendapatkan informasi cuaca berdasarkan lokasi dan tanggal.
- Caching data cuaca menggunakan Redis untuk mengurangi waktu respons.
- Mendukung query parameter untuk lokasi, tanggal mulai, tanggal akhir, atau tanggal tertentu.

## Prasyarat

- Node.js (versi terbaru direkomendasikan)
- Redis

## Instalasi

1. Clone repositori ini:

    ```bash
    git clone https://github.com/username/weather-api.git
    cd weather-api
    ```

2. Instal dependensi:

    ```bash
    npm install
    ```

3. Buat file `.env` di root proyek dan tambahkan variabel lingkungan berikut:

    ```plaintext
    WEATHER_API_KEY=your_api_key_here
    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```

4. Pastikan Redis server sedang berjalan. Anda bisa menjalankannya dengan perintah:

    ```bash
    redis-server
    ```

## Penggunaan

1. Mulai server:

    ```bash
    npm start
    ```

2. Server akan berjalan di `http://localhost:3000`.

3. Endpoint utama:

    - **GET /api/weather**: Mendapatkan informasi cuaca.

        Query Parameters:
        - `location` (string, wajib): Nama lokasi.
        - `startDate` (string, opsional): Tanggal mulai dalam format `YYYY-MM-DD`. Jika hanya `startDate` yang diberikan, API akan mengambil data untuk tanggal tersebut.
        - `endDate` (string, opsional): Tanggal akhir dalam format `YYYY-MM-DD`. Jika diberikan bersama `startDate`, API akan mengambil data untuk rentang tanggal tersebut.
        - Jika `startDate` dan `endDate` tidak diberikan, API akan mengambil data cuaca untuk tanggal saat ini.

        Contoh Permintaan:

        ```http
        GET /api/weather?location=wonokromo&startDate=2024-06-26&endDate=2024-06-27
        ```

        Contoh Respons:

        ```json
        {
          "status": "success",
          "data": {
          "queryCost": 48,
          "latitude": -7.30276,
          "longitude": 112.748,
          "resolvedAddress": "Wonokromo, Surabaya, Indonesia",
          "address": "wonokromo",
          "timezone": "Asia/Jakarta",
          "tzoffset": 7,
          "days": [
          {
            {
              "datetime": "2024-06-26",
              "datetimeEpoch": 1719334800,
              "tempmax": 87.7,
              "tempmin": 76.9,
              "temp": 82.8,
              "feelslikemax": 99.7,
              "feelslikemin": 76.9,
              "feelslike": 90.8,
              "dew": 77.9,
              "humidity": 86.2,
              "precip": 0.008,
              "precipprob": 100,
              "precipcover": 4.17,
              "preciptype": [
              "rain"
              ],
              "snow": 0,
              "snowdepth": 0,
              "windgust": 13.4,
              "windspeed": 15,
              "winddir": 77.7,
              "pressure": 1009,
              "cloudcover": 25,
              "visibility": 5.6,
              "solarradiation": 238.9,
              "solarenergy": 20.7,
              "uvindex": 8,
              "severerisk": 10,
              "sunrise": "05:41:00",
              "sunriseEpoch": 1719355260,
              "sunset": "17:22:59",
              "sunsetEpoch": 1719397379,
              "moonphase": 0.65,
              "conditions": "Rain, Partially cloudy",
              "description": "Partly cloudy throughout the day with early morning rain.",
              "icon": "rain",
              "stations": [
              "WARR"
              ],
              "source": "obs",
              "hours": [...]
            },
            {
              "datetime": "2024-06-26",
              ....
            },
          ],
            "stations": {
            "WARR": {
                "distance": 9296,
                "latitude": -7.38,
                "longitude": 112.78,
                "useCount": 0,
                "id": "WARR",
                "name": "WARR",
                "quality": 49,
                "contribution": 0
              }
            }
          }
        }
        ```

## Struktur Proyek

- `src/`
  - `controllers/`
    - `weather.controller.js`: Mengelola logika permintaan cuaca.
  - `services/`
    - `weather.service.js`: Mengambil data cuaca dari layanan pihak ketiga.
  - `config/`
    - `redis.config.js`: Konfigurasi untuk koneksi Redis.
  - `routes/`
    - `weather.routes.js`: Mendefinisikan rute API untuk cuaca.
  - `app.js`: Inisialisasi aplikasi Express.
- `.env`: File konfigurasi lingkungan (tidak termasuk dalam repositori, buat manual).

## Pengembangan

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan kirimkan pull request. Anda juga bisa membuka isu jika menemukan bug atau memiliki permintaan fitur baru.

## Lisensi

Proyek ini dilisensikan di bawah MIT License. Lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.

