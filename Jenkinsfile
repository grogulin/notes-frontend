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
            steps {
                
                script {
                    // def envContent = """
                    //     REACT_APP_BACKEND_URL=http://152.67.72.136:7000
                    // """
                    def envContent = """
                        REACT_APP_BACKEND_URL=https://freedevdom.mooo.com/notes/api
                    """
                    
                    sh "echo '${envContent}' > .env"
                }

                // Replace with the build commands or script for your specific project
                sh 'npm install' // Example command for a Node.js project
                sh 'npm run build'
                sh 'cd build/ && ls -la && cd ..'
            }
        }
     
        stage('Deploy') {
            steps {

                
                    
                sshagent(['oracle']) {

                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "sudo rm -rf /var/www/html/notes-frontend/*"'

                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "sudo rm -rf /home/ubuntu/app/notes-frontend/*"'
                    // sh 'scp -o StrictHostKeyChecking=no -r ./build/* ubuntu@152.67.72.136:apps/notes-frontend/'
                    sh 'scp -o StrictHostKeyChecking=no -r ./build/* ubuntu@152.67.72.136:/home/ubuntu/apps/notes-frontend'
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "sudo mv apps/notes-frontend/* /var/www/html/notes-frontend"'
                    // cp -r /home/ubuntu/apps/notes-frontend /var/www/html
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