val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val surrealdbVersion: String by project
val prometeus_version: String by project

var viteProcess: Process? = null

plugins {
    kotlin("jvm") version "1.9.0"
    id("io.ktor.plugin") version "2.3.2"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.9.0"
}

group = "com.cardmaster"
version = "0.0.1"
application {
    mainClass.set("com.cardmaster.ApplicationKt")
    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
    maven { url = uri("https://maven.pkg.jetbrains.space/kotlin/p/kotlin/kotlin-js-wrappers") }
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-auth-jvm:$ktor_version")
    implementation("io.ktor:ktor-client-core-jvm:$ktor_version")
    implementation("io.ktor:ktor-client-apache-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-sessions-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-host-common-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-cors:$ktor_version")
    implementation("io.ktor:ktor-server-status-pages-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-call-logging-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:$ktor_version")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-html-builder-jvm:$ktor_version")
    implementation("org.jetbrains:kotlin-css-jvm:1.0.0-pre.129-kotlin-1.4.20")
    implementation("io.ktor:ktor-server-cio-jvm")
    implementation("io.ktor:ktor-server-call-logging-jvm")
    implementation("io.ktor:ktor-server-call-id-jvm")
    implementation("io.ktor:ktor-server-metrics-jvm")
    implementation("io.ktor:ktor-server-core-jvm")
    implementation("io.ktor:ktor-server-metrics-micrometer-jvm")
    implementation("io.micrometer:micrometer-registry-prometheus:$prometeus_version")
    // Injection
    implementation("io.insert-koin:koin-ktor:3.4.1")
    // https://mvnrepository.com/artifact/io.insert-koin/koin-logger-slf4j

    implementation("io.insert-koin:koin-logger-slf4j:3.5.3")

    // Database Surreal DB
    implementation("com.surrealdb:surrealdb-driver:$surrealdbVersion")
    // SurrealDB java needs Java websockets
    implementation("org.java-websocket:Java-WebSocket:1.5.4")

    implementation("ch.qos.logback:logback-classic:$logback_version")
    testImplementation("io.ktor:ktor-server-tests-jvm:$ktor_version")
    testImplementation("io.ktor:ktor-client-content-negotiation:$ktor_version")
    testImplementation("io.insert-koin:koin-test:3.4.1")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}

tasks.wrapper {
    gradleVersion = "8.2.1"
    // You can either download the binary-only version of Gradle (BIN) or
    // the full version (with sources and documentation) of Gradle (ALL)
    distributionType = Wrapper.DistributionType.ALL
}

tasks.register("startVite") {
    doLast {
        val processBuilder = ProcessBuilder("npm", "run", "dev")
        processBuilder.directory(File("frontend"))
        viteProcess = processBuilder.start()

        // Add shutdown hook to terminate the Vite process when JVM exits
        Runtime.getRuntime().addShutdownHook(
            Thread {
                viteProcess?.destroy()
            },
        )
    }
}
tasks.register("buildFrontend") {
    doLast {
        exec {
            commandLine("npm", "run", "build")
            workingDir("frontend")
        }
    }
}
tasks.named("build") {
    dependsOn("buildFrontend")
}
tasks.named("run") {
    dependsOn("startVite")
}

tasks.compileKotlin {
    kotlinOptions {
        jvmTarget = "17"
    }
}
