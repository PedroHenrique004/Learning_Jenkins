pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test:ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
