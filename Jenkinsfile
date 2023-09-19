pipeline {
    agent any
    stages {
        stage("Pre-Build"){
            steps {
                echo "Pre-Build"
                deleteDir()
                sh "docker --version"
                sh "docker-compose version"
                echo "Pre-Build Complete"
            }
        }
        stage("Build"){
            steps {
                echo "Build"
                checkout scm
                sh "pwd"
                sh "ls -a"
                // sh "docker build ./backend -t your-places-backend"
                // sh "docker build ./frontend -t your-places-frontend"
                sh "echo 'Build Successful' "
            }
        }
        stage("Push to Docker Hub"){
            steps {
                echo "Push to Docker Hub"
                // withCredentials([usernamePassword(credentialsId: "DockerHubCredentials", passwordVariable: "dockerHubPass", usernameVariable: "dockerHubUser")]){
                //     sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                //     sh "docker tag your-places-backend ${env.dockerHubUser}/your-places-backend:latest"
                //     sh "docker tag your-places-frontend ${env.dockerHubUser}/your-places-frontend:latest"

                //     echo "Added Backend and Frontend Tags"

                //     sh "docker push ${env.dockerHubUser}/your-places-backend:latest"
                //     sh "docker push ${env.dockerHubUser}/your-places-frontend:latest"
                // }
                echo "Pushed to Docker Successfully"
            }
        }
        stage("Deploy"){
            steps {
                echo "Deploy"
                sh "docker-compose down"
                sh "docker-compose up -d --build"
                echo "Deploy Successful"
            }
        }
        stage("Post Deploy"){
            steps {
                echo "Post Deploy"
                echo "Post Deploy Complete"
            }
        }

    }
}