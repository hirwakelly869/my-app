## Smart Job allocator Application


## Project Overview
This application provides a user-friendly interface to search for jobs worldwide, view detailed information about specific jobs. It uses the jsearchAPI through RapidAPI to deliver real, up-to-date information about job availability.
 
## Demo Video
- [Myapp](https://youtu.be/4E8q_oWzpP4?si=yvmPikxgvecjRu4e)

## Features
- Job searching
- Profile creation
- User reviews
- Employers section

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Dockerfile
- **APIs**: Jsearch via RapidAPI
- **Deployment**: Web servers, Load Balancer

## API Information
This application uses  Jsearch via RapidAPI
- job searches by location
- job searches by skills
- job salary

**API Credit**: [Jsearch on RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)

## Local Setup Instructions

### Prerequisites
- Dockerhub
- Jsearch via RapidAPI

### Installation Steps
1. Clone the repository
   ```
   git clone https://github.com/yourusername/my-app.git
   cd my-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the project root and add your RapidAPI key
   ```
   RAPIDAPI_KEY=your_rapidapi_key_here
   PORT=4000
   ```

4. Start the application
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:4000`

## Deployment Instructions

### Server Configuration
This application has been deployed on two web servers (Web01 and Web02) with a load balancer (Lb01) distributing traffic between them.

### Web Server Setup (Web01 and Web02)

1. Containerize the app
   ```
   Write a Dockerfile
   ```
2. Build image and container and then test
   ```
   docker build -t <dockerhub-username>/<app-name>:v1 .
   docker run -p 8080:8080 <dockerhub-username>/<app-name>:v1
   curl http://localhost:8080 # verify it works
   ``` 
3. Push to docker
   ```
   docker login
   docker push <dockerhub-username>/<app-name>:v1
   ```
 
4. Connect to each server via SSH
   ```
   ssh username@web01_ip
   ssh username@web02_ip
   ```

5. Pull and run your image on each:
   ```
   docker pull <dockerhub-username>/<app-name>:v1
   docker run -d --name app --restart unless-stopped \ -p 8080:8080 <dockerhub-username>/<app-name>:v1
   ```

### Load Balancer Configuration (Lb01)

1. Update /etc/haproxy/haproxy.cfg (or your mounted file) so the backend points at the two app containers/hosts and ports:
   ```
   backend webapps
balance roundrobin
server web01 172.20.0.11:8080 check
server web02 172.20.0.12:8080 check
   ```

2. Reload HAProxy:
   ```
   docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg'
   ```

3. Test end-to-end
   ```
   curl http://localhost
   ```

## Development Challenges and Solutions

### Challenge 1: API Rate Limiting
**Issue**: The Jsearch api has limited user requests/api calls.
**Solution**: Upgrade to the unlimited api requests bouquet.

### Challenge 2: Web servers poor connection to the docker daemon
**Issue**: Web servers are not able to pull docker images 
**Solution**: Try other techniques for deployment
## Future Enhancements
- Mobile  application version
- User authentication
- Job sorting

## Contributors
- Hirwa Kelly (https://github.com/hirwakelly869)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- jsearch from rapidapi (https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
