# Debian Installation and Configuration Guide with Docker and PocketBase Setup

## 1. Prerequisites

Before we start, download and install the following:

- **Oracle VirtualBox**
- **Debian ISO image**

## 2. Setting Up a Virtual Machine

### 2.1 Creating a Virtual Machine in VirtualBox

1. **Create a New Machine:**

   - Name the machine and select a storage folder.
   - Specify the downloaded Debian ISO image as the startup disk.
   - **Important:** Enable the "Skip unattended installation" option.

2. **Configure System Resources:**

   - Set your preferred RAM and CPU cores.
   - Specify the desired storage space.

3. **Finalize and Start Installation:**
   - Review the configuration and start the Debian installation.

### 2.2 Installing Debian

**Step-by-Step Guide for Debian Installation**

1. **Choose Installation Mode:** Select "Graphical Install."
2. **Language and Localization:** Choose your preferred language, location, and keyboard layout.
3. **Network Configuration:**

   - Enter a hostname and domain name.

4. **User Setup:**

   - Set up both the root user and a regular user.

5. **Disk Partitioning:**

   - Choose "Guided - Use entire disk."
   - Select the first option available and choose "All files in one partition."
   - Finish partitioning and confirm by selecting "Yes" to save changes.

6. **Package Manager Configuration:**

   - When prompted about using a network mirror and the popularity contest, select "No."

7. **Software Selection:**

   - Select SSH Server if you require SSH access; other software options can be left as default.

8. **GRUB Installation:**
   - Choose "Yes" to install GRUB bootloader on `/dev/sda`.

After following these steps, Debian should complete the installation. Proceed with the initial system setup.

## 3. System Configuration

After rebooting into Debian, follow these steps:

### 3.1 Granting Admin Permissions

1. Open a terminal and log in as root:

   ```bash
   su root
   ```

2. Edit the sudoers file to add admin privileges:

   ```bash
   nano /etc/sudoers
   ```

   In the permissions section, add your user and grant all privileges.

3. Save and close the file:

   - **Save:** Press `CTRL + O`, then `Enter`
   - **Exit:** Press `CTRL + X`

4. Exit root:
   ```bash
   exit
   ```

## 4. Installing Docker

### 4.1 Enable Additional Repositories

1. Open Synaptic Package Manager.
2. Go to **Settings > Repositories.**
3. Enable all options in "Downloadable from the internet" under Debian software.
4. Enable the first checkbox under "Other software."
5. Close and refresh package information.

### 4.2 Install Docker

1. In Synaptic, search for and select all Docker-related packages, then install.

   **Note:** If prompted to insert a CD, disable CD-ROM entries in your sources list:

   ```bash
   sudo nano /etc/apt/sources.list
   ```

   Comment out any line starting with `deb cdrom:` by adding `#` at the beginning.

2. Save and exit the file, then update package lists:

   ```bash
   sudo apt-get update
   ```

3. Reattempt Docker installation.

### Verify Installation

Check if Docker is installed and running by executing:

```bash
sudo docker run hello-world
```

## 5. PocketBase Setup

### 5.1 Creating the PocketBase Directory and Dockerfile

1. Create a directory for PocketBase:

   ```bash
   mkdir pocketbase && cd pocketbase
   ```

2. Create a Dockerfile in this directory:

   ```bash
   nano Dockerfile
   ```

3. Paste the following content into Dockerfile:

   ```Dockerfile
   FROM alpine:latest

   ARG PB_VERSION=0.22.23

   RUN apk add --no-cache \
       unzip \
       ca-certificates

   # Download and unzip PocketBase
   ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
   RUN unzip /tmp/pb.zip -d /pb/

   EXPOSE 8080

   # Start PocketBase
   CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
   ```

   Save and close the file.

### 5.2 Building and Running PocketBase Docker Image

1. Build the Docker image:

   ```bash
   sudo docker build -t pocketbase:0.1 .
   ```

2. Run PocketBase on port 8080:

   ```bash
   sudo docker run -p 8080:8080 -v /home/[your-username]/pocketbase/data/:/pb/pb_data pocketbase:0.1
   ```

3. Access PocketBase:
   Open your browser and go to [http://0.0.0.0:8080/_/](http://0.0.0.0:8080/_/).
   Create an account and log in to your existing one.


### 6. Project Configuration

1. Use command:
    npm install pocketbase --save


