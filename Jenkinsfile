pipeline {
  agent any

  environment {
    dockerHubRegistry = 'dongjukim123/soundory-fe'
    dockerHubRegistryCredential = 'dockerhub-token'
    githubCredential = 'github-token'
  }

  stages {

    stage('Checkout from GitHub') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[
            url: 'https://github.com/rlaehdwn0105/Sondory-Service-FE.git',
            credentialsId: githubCredential
          ]]
        ])
      }
    }

    stage('Install & Build (Vite)') {
      agent {
        docker {
          image 'node:20-alpine'
          args '-u root:root'
        }
      }
      steps {
        sh '''
          npm ci
          npm run build
        '''
      }
    }

    stage('Docker Build') {
      steps {
        sh """
          docker build -t ${dockerHubRegistry}:${currentBuild.number} .
          docker tag ${dockerHubRegistry}:${currentBuild.number} ${dockerHubRegistry}:latest
          docker tag ${dockerHubRegistry}:${currentBuild.number} ${dockerHubRegistry}:canary
        """
      }
    }

    stage('Docker Push') {
      steps {
        withDockerRegistry(credentialsId: dockerHubRegistryCredential, url: '') {
          sh """
            docker push ${dockerHubRegistry}:${currentBuild.number}
            docker push ${dockerHubRegistry}:latest
            docker push ${dockerHubRegistry}:canary
          """
        }
      }
    }
  }

  post {
    success {
      echo '✅ 프론트엔드 CI 성공: 이미지 빌드 및 푸시 완료'
    }
    failure {
      echo '❌ CI 실패: 로그 확인 필요'
    }
  }
}
