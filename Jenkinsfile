pipeline {
    agent any

    stages {
        stage('Clean up') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout'){
            steps {
                git branch: 'main', url: 'https://github.com/PedroHenrique004/Learning_Jenkins'
            }
        }

        stage ('Build') {
            steps {
                sh 'npm ci'
            }
        }
    }
}
