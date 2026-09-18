def nomeCompletoAmbiente(ambiente) {
    if (ambiente == 'production') {
        return "Produção"
    } else {
        return "Staging (ambiente de testes)"
    }
}

def deployIniciadoEm = ""

pipeline {
    agent any

    environment {
        APP_NAME = 'learning-jenkins'
        NODE_ENV = "${params.ENVIRONMENT == 'production' ? 'production' : 'development'}"
        BUILD_TAG = "${APP_NAME}-${BUILD_NUMBER}"
    }

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
                echo "Buildando ${env.BUILD_TAG} a partir do commit ${env.GIT_COMMIT}"
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Ambiente selecionado: ${nomeCompletoAmbiente(params.ENVIRONMENT)}"
                    deployIniciadoEm = new Date().format("dd/MM/yyyy HH:mm:ss")
                }
                sh '''
                    echo "Instalando dependências..."
                    npm ci
                    echo "Dependências instaladas com sucesso"
                '''
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

        stage('Summary') {
            steps {
                script {
                    echo "Build iniciado em: ${deployIniciadoEm}"
                    echo "Resumo final: ${nomeCompletoAmbiente(params.ENVIRONMENT)}, branch ${params.BRANCH_TO_BUILD}"
                }
            }
        }
    }
}
