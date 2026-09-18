pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_TO_BUILD', defaultValue: 'main', description: 'Branch a ser buildada')


        choice(
            name: 'ENVIRONMENT', 
            choices: ['staging', 'production'], 
            description: 'Ambiente de destino'
        )


        booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: 'Pular os testes?')
    }

    stages {
        stage('Clean up') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_TO_BUILD}", url: 'https://github.com/PedroHenrique004/Learning_Jenkins'
            }
        }

        stage('Build') {
            steps {
                script {
                    if (params.ENVIRONMENT == 'production') {
                        echo "Atenção: build de produção!"
                    } else {
                        echo "Build de staging, ambiente de testes"
                    }
                }
                sh 'npm ci'
            }
        }

        stage('Test') {
            when {
                expression { params.SKIP_TESTS == false }
            }
            steps {
                sh 'npm run test:ci'
            }
        }
    }
}