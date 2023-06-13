pipeline {
  agent any
  

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'git_credentials',
                    url: 'https://github.com/grogulin/notes-frontend.git'
            }
        }
    
        stage('Build') {
            script {
                def envContent = """
                    BACKEND_URL=http://152.67.72.136:7000
                """
                
                sh "echo '${envContent}' > .env"
            }
            steps {
                // Replace with the build commands or script for your specific project
                sh 'npm install' // Example command for a Node.js project
                sh 'npm run build'
                sh 'cd build/ && ls -la && cd ..'
            }
        }
     
        stage('Deploy') {
            steps {

                
                    
                sshagent(['oracle']) {
                    // sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "pm2 stop notes-frontend && rm -rf apps/notes-frontend/*"'
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "rm -rf apps/notes-frontend/*"'
                    sh 'scp -o StrictHostKeyChecking=no -r ./build/* ubuntu@152.67.72.136:apps/notes-frontend/'
                    // sh 'scp -o StrictHostKeyChecking=no -r ./.env ubuntu@152.67.72.136:apps/notes-frontend/'
                }
        
                sshagent(['oracle']) {
                    // sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "cd apps/notes-backend/ && ls -la && npm install --production"'
                    // sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "cd apps/notes-backend/ && pm2 start server.js --name notes-backend"'
                }

            }
        }
    }
}