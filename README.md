<b>This is the mobile client for Cinelink. The high-performance Go backend with L1/L2 caching repository is located here: <a href="https://github.com/tarashunchak/CinelinkMobileBack">Cinelink Backend</a></b><br/>

<div width="100%">
  <b>Home Screen:</b><br/>
  <li>Movie of the Day: A dedicated feature block that dynamically updates featured content once every 24 hours.</li>
  <li>Horizontal Carousels: Seamlessly browse curated lists like Now in Cinemas and Trending movies.</li>
  <li>Performance First: The entire user interface is powered by image lazy loading to ensure smooth scrolling and reduced data consumption.</li><br/>
  <b>Movie Details:</b><br/>
  <li>Rich Metadata Aggregation: Displays essential movie details fetched via the backend gateway from the TMDb API, including release year, director, full cast, runtime, and IMDb ratings. </li>
  <li>Media Integration: Features an embedded YouTube player to stream official trailers directly within the app.</li><br/>
  <div align="center">
    <img width="250" alt="HomeScreen" src="https://github.com/user-attachments/assets/810f7a0d-a72a-43db-ab6e-e9bce2ac8ef1" />
    <img width="250" alt="MovieScreen" src="https://github.com/user-attachments/assets/26bf37a5-0af0-4fbe-ba69-bd7c550aee8a" />
    <img width="250" alt="BottomSheet" src="https://github.com/user-attachments/assets/9ba41af3-81e4-4ab0-8cf4-de0b22cd74df" />
  </div>

  <b>Library Screen:</b><br/>
  <li>Personalized Watchlist: A dedicated space where users can easily manage and access their saved movies. </li>
  <li>Real-time Synchronization: Adding or removing a movie (via the interactive Bottom Sheet) instantly updates the Library view without needing manual page refreshes, thanks to reactive state management.</li>
  <li>Secure Persistent Storage: Watchlist items are linked directly to the user's profile and securely stored in the PostgreSQL database, ensuring data persistence across sessions.</li>
  <div align="center">
    <img width="250" alt="image" src="https://github.com/user-attachments/assets/b246ccc9-b057-4c91-8e2e-bd392dcb3530" />
    <img width="250" alt="image" src="https://github.com/user-attachments/assets/b4c304c0-bf2f-42ac-95d9-8b0e890105ff" />
  </div>

  <b>Social Screen:</b><br/>
  <li>Chats: A real-time messaging hub powered by the Go WebSocket server, enabling instant and seamless communication between users. </li>
  <li>Recommendations: A dedicated feed to discover, view, and explore movie recommendations sent directly by other platform users.</li>
  <li>Friends Management: An interactive section to search for peers, view profiles, and easily manage your social network within the app.</li>
  <li>Activity Feed (In Development): A planned social timeline designed to track your friends' latest updates, including their movie ratings, reviews, and custom posts.</li><br/>
  <div align="center">
    <img width="250" alt="image" src="https://github.com/user-attachments/assets/fbccf847-186a-4902-b481-3422b5cee7e7" />
    <img width="250" alt="image" src="https://github.com/user-attachments/assets/376afd80-44dc-4025-87cd-226ca1a3d02e" />
    <img width="250" alt="image" src="https://github.com/user-attachments/assets/e2e9e56d-b433-48d4-9b3a-a78c8ace04e1" />
  </div>
</div>
