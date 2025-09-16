pipeline {
    agent any


    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/MunnaKumar32990/Fullstackrevision.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Frontend/employee-frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\employee-frontend" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\employee-frontend"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\employee-frontend"
                xcopy /E /I /Y Frontend\\employee-frontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\employee-frontend"
                '''
            }
        }

        stage('Build Backend') {
            steps {
                dir('Backend/EmployeeManagement') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\EmployeeManagement.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\EmployeeManagement.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\EmployeeManagement" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\EmployeeManagement"
                )
                copy Backend\\EmployeeManagement\\target\\*.war "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\EmployeeManagement.war"
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline executed successfully!"
        }
        failure {
            echo "❌ Pipeline Failed."
        }
    }
}
