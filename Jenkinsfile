pipeline {
  agent any

  environment {
    DOCKER_REGISTRY    = 'dongjukim123/soundory-fe'
    DOCKER_CREDENTIALS = 'dockerhub-token'
    GITHUB_CREDENTIALS = 'github-token'
    GITHUB_REPO_URL    = 'https://github.com/rlaehdwn0105/Sondory-Service-FE.git'
    HELM_GITOPS_REPO   = 'https://github.com/rlaehdwn0105/Soundory-Service-Infra.git'
    GITHUB_BRANCH      = 'main'
    GIT_USER_EMAIL     = 'dongju08@naver.com'
    GIT_USER_NAME      = 'rlaehdwn0105'
  }

  stages {

    stage('Checkout Source') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: "refs/heads/${env.GITHUB_BRANCH}"]],
          userRemoteConfigs: [[
            url: "${GITHUB_REPO_URL}",
            credentialsId: "${GITHUB_CREDENTIALS}"
          ]]
        ])
      }
      post {
        success {
          echo 'Checkout succeeded.'
        }
        failure {
          echo 'Checkout failed.'
        }
      }
    }

    stage('Docker Build') {
      steps {
        sh """
          docker build -t ${DOCKER_REGISTRY}:${BUILD_NUMBER} .
          docker tag ${DOCKER_REGISTRY}:${BUILD_NUMBER} ${DOCKER_REGISTRY}:latest
        """
      }
      post {
        success {
          echo 'Docker build succeeded.'
        }
        failure {
          echo 'Docker build failed.'
        }
      }
    }

    stage('Docker Push') {
      steps {
        withDockerRegistry(credentialsId: "${DOCKER_CREDENTIALS}", url: '') {
          sh """
            docker push ${DOCKER_REGISTRY}:${BUILD_NUMBER}
            docker push ${DOCKER_REGISTRY}:latest
          """
        }
      }
      post {
        success {
          echo 'Docker push succeeded.'
          sh """
            docker rmi ${DOCKER_REGISTRY}:${BUILD_NUMBER} || true
            docker rmi ${DOCKER_REGISTRY}:latest || true
          """
        }
        failure {
          echo 'Docker push failed.'
          sh """
            docker rmi ${DOCKER_REGISTRY}:${BUILD_NUMBER} || true
            docker rmi ${DOCKER_REGISTRY}:latest || true
          """
        }
      }
    }

    stage('Update Helm values & Git Push') {
      steps {
        sh 'rm -rf gitOpsRepo && mkdir -p gitOpsRepo'
        dir('gitOpsRepo') {
          git branch: "${GITHUB_BRANCH}",
              credentialsId: "${GITHUB_CREDENTIALS}",
              url: "${HELM_GITOPS_REPO}"

          sh "git config --global user.email '${GIT_USER_EMAIL}'"
          sh "git config --global user.name '${GIT_USER_NAME}'"

          sh "sed -i 's|tag: .*|tag: ${BUILD_NUMBER}|' helm-chart/my-frontend/values.yaml"

          sh "git add helm-chart/my-frontend/values.yaml"
          sh "git commit -m 'ci: update frontend image tag to #${BUILD_NUMBER}' || echo 'No changes to commit'"

          withCredentials([gitUsernamePassword(credentialsId: "${GITHUB_CREDENTIALS}", gitToolName: 'git-tool')]) {
            sh "git push origin ${GITHUB_BRANCH}"
          }
        }
      }
      post {
        success {
          echo 'Helm values.yaml updated and pushed successfully.'
        }
        failure {
          echo 'Failed to update Helm values.yaml.'
        }
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully.'
    }
    failure {
      echo 'Pipeline failed.'
    }
  }
}
