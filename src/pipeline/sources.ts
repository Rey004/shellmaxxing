import { CommandEntry, RiskLevel } from './types.js';

export interface CommandSourceInput {
  intent: string;
  aliases: string[];
  windows: string;
  linux: string;
  mac: string;
  descriptionFallback: string;
  examples: string[];
  category: string;
  riskLevel: RiskLevel;
  tldrName?: string;
}

export const baseCommands: CommandSourceInput[] = [
  // FILESYSTEM
  {
    intent: 'List files in directory',
    aliases: ['show files', 'display files', 'view files', 'see files', 'list folder contents'],
    windows: 'dir',
    linux: 'ls',
    mac: 'ls',
    descriptionFallback: 'List directory contents.',
    examples: ['ls', 'dir'],
    category: 'filesystem',
    riskLevel: 'safe',
    tldrName: 'ls'
  },
  {
    intent: 'Show current directory',
    aliases: ['where am i', 'current folder', 'current path', 'show directory', 'get working directory'],
    windows: 'cd',
    linux: 'pwd',
    mac: 'pwd',
    descriptionFallback: 'Print name of current/working directory.',
    examples: ['pwd'],
    category: 'filesystem',
    riskLevel: 'safe',
    tldrName: 'pwd'
  },
  {
    intent: 'Create folder',
    aliases: ['make directory', 'new folder', 'create directory', 'add directory'],
    windows: 'mkdir <folder-name>',
    linux: 'mkdir <folder-name>',
    mac: 'mkdir <folder-name>',
    descriptionFallback: 'Create the directory(ies), if they do not already exist.',
    examples: ['mkdir my_folder'],
    category: 'filesystem',
    riskLevel: 'safe',
    tldrName: 'mkdir'
  },
  {
    intent: 'Delete file',
    aliases: ['remove file', 'erase file', 'delete a file', 'erase files', 'unlink file'],
    windows: 'del <file>',
    linux: 'rm <file>',
    mac: 'rm <file>',
    descriptionFallback: 'Remove (unlink) the file(s).',
    examples: ['rm test.txt', 'del test.txt'],
    category: 'filesystem',
    riskLevel: 'high',
    tldrName: 'rm'
  },
  {
    intent: 'Copy file',
    aliases: ['duplicate file', 'copy a file', 'clone file'],
    windows: 'copy <source> <destination>',
    linux: 'cp <source> <destination>',
    mac: 'cp <source> <destination>',
    descriptionFallback: 'Copy files and directories.',
    examples: ['cp source.txt dest.txt'],
    category: 'filesystem',
    riskLevel: 'safe',
    tldrName: 'cp'
  },
  {
    intent: 'Move file',
    aliases: ['rename file', 'shift file', 'relocate file', 'rename folder'],
    windows: 'move <source> <destination>',
    linux: 'mv <source> <destination>',
    mac: 'mv <source> <destination>',
    descriptionFallback: 'Rename source to destination, or move source(s) to directory.',
    examples: ['mv old.txt new.txt'],
    category: 'filesystem',
    riskLevel: 'medium',
    tldrName: 'mv'
  },
  {
    intent: 'Clear screen',
    aliases: ['cls', 'clear console', 'clear terminal', 'reset terminal'],
    windows: 'cls',
    linux: 'clear',
    mac: 'clear',
    descriptionFallback: 'Clears the screen or terminal window.',
    examples: ['clear', 'cls'],
    category: 'filesystem',
    riskLevel: 'safe',
    tldrName: 'clear'
  },
  {
    intent: 'Find files',
    aliases: ['search file', 'locate file', 'find files by name', 'where is file'],
    windows: 'where <filename>',
    linux: 'find . -name <filename>',
    mac: 'find . -name <filename>',
    descriptionFallback: 'Search for files in a directory hierarchy.',
    examples: ['find . -name "*.ts"'],
    category: 'filesystem',
    riskLevel: 'safe',
    tldrName: 'find'
  },

  // NETWORKING
  {
    intent: 'Show ip address',
    aliases: ['show my ip', 'find ip', 'internet address', 'network address', 'network address info'],
    windows: 'ipconfig',
    linux: 'ip addr',
    mac: 'ifconfig',
    descriptionFallback: 'Displays all current TCP/IP network configuration values.',
    examples: ['ipconfig', 'ip addr'],
    category: 'networking',
    riskLevel: 'safe',
    tldrName: 'ip'
  },
  {
    intent: 'Ping host',
    aliases: ['test connection', 'check network latency', 'ping server', 'test host connectivity'],
    windows: 'ping <host>',
    linux: 'ping -c 4 <host>',
    mac: 'ping -c 4 <host>',
    descriptionFallback: 'Send ICMP ECHO_REQUEST to network hosts.',
    examples: ['ping google.com'],
    category: 'networking',
    riskLevel: 'safe',
    tldrName: 'ping'
  },
  {
    intent: 'Check network ports',
    aliases: ['list open ports', 'show network connections', 'view active ports', 'port status'],
    windows: 'netstat -ano',
    linux: 'ss -tuln',
    mac: 'netstat -an',
    descriptionFallback: 'Displays active TCP connections, ports on which the computer is listening.',
    examples: ['netstat -an', 'ss -tuln'],
    category: 'networking',
    riskLevel: 'safe',
    tldrName: 'netstat'
  },
  {
    intent: 'Download file',
    aliases: ['fetch url', 'download from web', 'curl website', 'wget file'],
    windows: 'curl -O <url>',
    linux: 'curl -O <url>',
    mac: 'curl -O <url>',
    descriptionFallback: 'Transfers data from or to a server.',
    examples: ['curl -O https://example.com/file.zip'],
    category: 'networking',
    riskLevel: 'safe',
    tldrName: 'curl'
  },

  // PROCESSES
  {
    intent: 'Show running processes',
    aliases: ['list processes', 'running programs', 'active processes', 'show task manager'],
    windows: 'tasklist',
    linux: 'ps aux',
    mac: 'ps aux',
    descriptionFallback: 'Displays a list of currently running processes on local or remote machine.',
    examples: ['ps aux', 'tasklist'],
    category: 'processes',
    riskLevel: 'safe',
    tldrName: 'ps'
  },
  {
    intent: 'Kill process',
    aliases: ['stop process', 'terminate process', 'end process', 'kill process by pid'],
    windows: 'taskkill /PID <pid> /F',
    linux: 'kill -9 <pid>',
    mac: 'kill -9 <pid>',
    descriptionFallback: 'Send a signal to a process, default is SIGTERM (often used to kill/stop a process).',
    examples: ['kill -9 1234', 'taskkill /PID 1234 /F'],
    category: 'processes',
    riskLevel: 'high',
    tldrName: 'kill'
  },
  {
    intent: 'Show system resource usage',
    aliases: ['monitor cpu', 'check memory consumption', 'show resource load', 'view system stats'],
    windows: 'taskmgr',
    linux: 'top',
    mac: 'top',
    descriptionFallback: 'Display Linux processes and system resources in real-time.',
    examples: ['top'],
    category: 'processes',
    riskLevel: 'safe',
    tldrName: 'top'
  },

  // GIT
  {
    intent: 'Check git status',
    aliases: ['git status', 'status of git repository', 'check repository changes', 'git file changes'],
    windows: 'git status',
    linux: 'git status',
    mac: 'git status',
    descriptionFallback: 'Show the working tree status.',
    examples: ['git status'],
    category: 'Git',
    riskLevel: 'safe',
    tldrName: 'git-status'
  },
  {
    intent: 'Clone git repository',
    aliases: ['git clone', 'download repo', 'clone repository', 'git download'],
    windows: 'git clone <repository>',
    linux: 'git clone <repository>',
    mac: 'git clone <repository>',
    descriptionFallback: 'Clone a repository into a new directory.',
    examples: ['git clone https://github.com/user/repo.git'],
    category: 'Git',
    riskLevel: 'safe',
    tldrName: 'git-clone'
  },
  {
    intent: 'Commit changes in git',
    aliases: ['git commit', 'save changes', 'commit changes', 'git save'],
    windows: 'git commit -m <message>',
    linux: 'git commit -m <message>',
    mac: 'git commit -m <message>',
    descriptionFallback: 'Record changes to the repository.',
    examples: ['git commit -m "initial commit"'],
    category: 'Git',
    riskLevel: 'safe',
    tldrName: 'git-commit'
  },
  {
    intent: 'Push git commits',
    aliases: ['git push', 'upload commits', 'push changes', 'sync remote repo'],
    windows: 'git push origin <branch>',
    linux: 'git push origin <branch>',
    mac: 'git push origin <branch>',
    descriptionFallback: 'Update remote refs along with associated objects.',
    examples: ['git push origin main'],
    category: 'Git',
    riskLevel: 'safe',
    tldrName: 'git-push'
  },
  {
    intent: 'Pull git commits',
    aliases: ['git pull', 'download latest code', 'update branch', 'fetch and merge'],
    windows: 'git pull origin <branch>',
    linux: 'git pull origin <branch>',
    mac: 'git pull origin <branch>',
    descriptionFallback: 'Fetch from and integrate with another repository or a local branch.',
    examples: ['git pull origin main'],
    category: 'Git',
    riskLevel: 'safe',
    tldrName: 'git-pull'
  },
  {
    intent: 'Switch git branch',
    aliases: ['git checkout', 'git switch', 'change branch', 'checkout branch'],
    windows: 'git checkout <branch>',
    linux: 'git checkout <branch>',
    mac: 'git checkout <branch>',
    descriptionFallback: 'Switch branches or restore working tree files.',
    examples: ['git checkout dev', 'git switch dev'],
    category: 'Git',
    riskLevel: 'safe',
    tldrName: 'git-checkout'
  },

  // DOCKER
  {
    intent: 'Run docker container',
    aliases: ['docker run', 'start docker container', 'run container', 'spin up container'],
    windows: 'docker run <image>',
    linux: 'docker run <image>',
    mac: 'docker run <image>',
    descriptionFallback: 'Run a command in a new container.',
    examples: ['docker run -d -p 80:80 nginx'],
    category: 'Docker',
    riskLevel: 'medium',
    tldrName: 'docker-run'
  },
  {
    intent: 'List docker containers',
    aliases: ['docker ps', 'list containers', 'show active containers', 'running docker processes'],
    windows: 'docker ps',
    linux: 'docker ps',
    mac: 'docker ps',
    descriptionFallback: 'List docker containers.',
    examples: ['docker ps', 'docker ps -a'],
    category: 'Docker',
    riskLevel: 'safe',
    tldrName: 'docker-ps'
  },
  {
    intent: 'Stop docker container',
    aliases: ['docker stop', 'stop container', 'halt docker container'],
    windows: 'docker stop <container-id>',
    linux: 'docker stop <container-id>',
    mac: 'docker stop <container-id>',
    descriptionFallback: 'Stop one or more running containers.',
    examples: ['docker stop abc12345'],
    category: 'Docker',
    riskLevel: 'safe',
    tldrName: 'docker-stop'
  },
  {
    intent: 'Build docker image',
    aliases: ['docker build', 'create docker image', 'compile dockerfile'],
    windows: 'docker build -t <tag-name> .',
    linux: 'docker build -t <tag-name> .',
    mac: 'docker build -t <tag-name> .',
    descriptionFallback: 'Build an image from a Dockerfile.',
    examples: ['docker build -t my-app .'],
    category: 'Docker',
    riskLevel: 'medium',
    tldrName: 'docker-build'
  },

  // KUBERNETES
  {
    intent: 'Get kubernetes pods',
    aliases: ['kubectl get pods', 'show pods', 'list pods', 'kubernetes list pods'],
    windows: 'kubectl get pods',
    linux: 'kubectl get pods',
    mac: 'kubectl get pods',
    descriptionFallback: 'List one or many kubernetes resources (pods).',
    examples: ['kubectl get pods', 'kubectl get pods -n kube-system'],
    category: 'Kubernetes',
    riskLevel: 'safe',
    tldrName: 'kubectl'
  },
  {
    intent: 'Describe kubernetes pod',
    aliases: ['kubectl describe pod', 'pod details', 'show pod info', 'debug pod'],
    windows: 'kubectl describe pod <pod-name>',
    linux: 'kubectl describe pod <pod-name>',
    mac: 'kubectl describe pod <pod-name>',
    descriptionFallback: 'Show details of a specific kubernetes resource (pod).',
    examples: ['kubectl describe pod my-pod-123'],
    category: 'Kubernetes',
    riskLevel: 'safe',
    tldrName: 'kubectl'
  },
  {
    intent: 'Apply kubernetes configuration',
    aliases: ['kubectl apply', 'deploy manifest', 'kubectl deploy', 'apply deployment'],
    windows: 'kubectl apply -f <file.yaml>',
    linux: 'kubectl apply -f <file.yaml>',
    mac: 'kubectl apply -f <file.yaml>',
    descriptionFallback: 'Apply a configuration to a resource by file name or stdin.',
    examples: ['kubectl apply -f deployment.yaml'],
    category: 'Kubernetes',
    riskLevel: 'medium',
    tldrName: 'kubectl'
  },
  {
    intent: 'View kubernetes logs',
    aliases: ['kubectl logs', 'get pod logs', 'read pod output', 'kubernetes logs'],
    windows: 'kubectl logs <pod-name>',
    linux: 'kubectl logs <pod-name>',
    mac: 'kubectl logs <pod-name>',
    descriptionFallback: 'Print the logs for a container in a pod.',
    examples: ['kubectl logs my-pod-123 -f'],
    category: 'Kubernetes',
    riskLevel: 'safe',
    tldrName: 'kubectl'
  },

  // AWS CLI
  {
    intent: 'List s3 buckets',
    aliases: ['aws s3 ls', 'show s3 buckets', 'list aws buckets', 'get s3 buckets'],
    windows: 'aws s3 ls',
    linux: 'aws s3 ls',
    mac: 'aws s3 ls',
    descriptionFallback: 'List S3 buckets or objects.',
    examples: ['aws s3 ls', 'aws s3 ls s3://my-bucket'],
    category: 'cloud',
    riskLevel: 'safe',
    tldrName: 'aws-s3'
  },
  {
    intent: 'Copy to s3 bucket',
    aliases: ['aws s3 cp', 'upload to s3', 'download from s3', 's3 copy file'],
    windows: 'aws s3 cp <source> s3://<bucket-name>',
    linux: 'aws s3 cp <source> s3://<bucket-name>',
    mac: 'aws s3 cp <source> s3://<bucket-name>',
    descriptionFallback: 'Copies a local file or S3 object to another location locally or in S3.',
    examples: ['aws s3 cp test.txt s3://my-bucket/'],
    category: 'cloud',
    riskLevel: 'safe',
    tldrName: 'aws-s3'
  },
  {
    intent: 'Describe ec2 instances',
    aliases: ['aws list ec2', 'list virtual machines', 'aws show instances', 'describe ec2'],
    windows: 'aws ec2 describe-instances',
    linux: 'aws ec2 describe-instances',
    mac: 'aws ec2 describe-instances',
    descriptionFallback: 'Describes one or more of your EC2 instances.',
    examples: ['aws ec2 describe-instances'],
    category: 'cloud',
    riskLevel: 'safe',
    tldrName: 'aws'
  },

  // PACKAGE MANAGEMENT
  {
    intent: 'Install software packages',
    aliases: ['install package', 'install program', 'apt install', 'brew install', 'winget install'],
    windows: 'winget install <package>',
    linux: 'sudo apt install <package>',
    mac: 'brew install <package>',
    descriptionFallback: 'Install one or more software packages.',
    examples: ['brew install node', 'sudo apt install git'],
    category: 'package management',
    riskLevel: 'medium',
    tldrName: 'brew'
  },
  {
    intent: 'Npm install package',
    aliases: ['npm install', 'npm add package', 'node package install', 'npm get package'],
    windows: 'npm install <package-name>',
    linux: 'npm install <package-name>',
    mac: 'npm install <package-name>',
    descriptionFallback: 'Install a package and any packages that it depends on.',
    examples: ['npm install express', 'npm install -g typescript'],
    category: 'package management',
    riskLevel: 'safe',
    tldrName: 'npm-install'
  },
  {
    intent: 'Npm run dev',
    aliases: ['start dev server', 'npm dev', 'run local server', 'start typescript server'],
    windows: 'npm run dev',
    linux: 'npm run dev',
    mac: 'npm run dev',
    descriptionFallback: 'Runs a package development script defined in package.json.',
    examples: ['npm run dev'],
    category: 'package management',
    riskLevel: 'safe',
    tldrName: 'npm'
  },

  // SYSTEM ADMINISTRATION
  {
    intent: 'Show system uptime',
    aliases: ['system uptime', 'how long is system running', 'uptime info', 'machine running duration'],
    windows: 'systeminfo | find "System Boot Time"',
    linux: 'uptime',
    mac: 'uptime',
    descriptionFallback: 'Tell how long the system has been running.',
    examples: ['uptime'],
    category: 'system administration',
    riskLevel: 'safe',
    tldrName: 'uptime'
  },
  {
    intent: 'Check disk usage',
    aliases: ['disk space', 'df -h', 'free disk space', 'check hard drive space'],
    windows: 'wmic logicaldisk get size,freespace,caption',
    linux: 'df -h',
    mac: 'df -h',
    descriptionFallback: 'Report file system disk space usage.',
    examples: ['df -h'],
    category: 'system administration',
    riskLevel: 'safe',
    tldrName: 'df'
  },
  {
    intent: 'Show free memory',
    aliases: ['free ram', 'check memory status', 'system RAM usage', 'free memory'],
    windows: 'systeminfo | find "Available Physical Memory"',
    linux: 'free -m',
    mac: 'vm_stat',
    descriptionFallback: 'Display amount of free and used memory in the system.',
    examples: ['free -m'],
    category: 'system administration',
    riskLevel: 'safe',
    tldrName: 'free'
  },
  // SECURITY
  {
    intent: 'Change file permissions',
    aliases: ['chmod', 'change permissions', 'make executable', 'file permissions', 'chmod permissions'],
    windows: 'icacls <file> /grant <user>:<permissions>',
    linux: 'chmod <permissions> <file>',
    mac: 'chmod <permissions> <file>',
    descriptionFallback: 'Change the access permissions of a file or directory.',
    examples: ['chmod +x script.sh', 'chmod 755 file.txt'],
    category: 'security',
    riskLevel: 'medium',
    tldrName: 'chmod'
  },
  {
    intent: 'Change file owner',
    aliases: ['chown', 'change owner', 'chown owner group', 'set file owner'],
    windows: 'takeown /f <file>',
    linux: 'chown <owner>:<group> <file>',
    mac: 'chown <owner>:<group> <file>',
    descriptionFallback: 'Change user and group ownership of files and directories.',
    examples: ['chown root file.txt', 'chown -R user:group folder'],
    category: 'security',
    riskLevel: 'medium',
    tldrName: 'chown'
  },
  {
    intent: 'SSH connect',
    aliases: ['ssh login', 'connect to remote server', 'secure shell connect', 'ssh command'],
    windows: 'ssh <user>@<host>',
    linux: 'ssh <user>@<host>',
    mac: 'ssh <user>@<host>',
    descriptionFallback: 'Secure Shell is a protocol used to securely log onto remote systems.',
    examples: ['ssh root@192.168.1.1', 'ssh -i key.pem user@host'],
    category: 'security',
    riskLevel: 'safe',
    tldrName: 'ssh'
  },
  {
    intent: 'Generate SSH key',
    aliases: ['ssh-keygen', 'create ssh key', 'generate public private key pair', 'new ssh key'],
    windows: 'ssh-keygen -t rsa -b 4096 -C <email>',
    linux: 'ssh-keygen -t rsa -b 4096 -C <email>',
    mac: 'ssh-keygen -t rsa -b 4096 -C <email>',
    descriptionFallback: 'Generate a new SSH key pair for secure authentication.',
    examples: ['ssh-keygen -t ed25519 -C "email@example.com"'],
    category: 'security',
    riskLevel: 'safe',
    tldrName: 'ssh-keygen'
  },
  {
    intent: 'Enable firewall',
    aliases: ['turn on firewall', 'activate firewall', 'enable ufw', 'netsh firewall on'],
    windows: 'netsh advfirewall set allprofiles state on',
    linux: 'sudo ufw enable',
    mac: 'sudo pfctl -E',
    descriptionFallback: 'Enables the system firewall to block unauthorized network access.',
    examples: ['sudo ufw enable', 'netsh advfirewall set allprofiles state on'],
    category: 'security',
    riskLevel: 'medium',
    tldrName: 'ufw'
  },

  // TEXT PROCESSING
  {
    intent: 'Search text in files',
    aliases: ['grep', 'findstr', 'find word in files', 'search string', 'find text pattern'],
    windows: 'findstr <pattern> <file>',
    linux: 'grep <pattern> <file>',
    mac: 'grep <pattern> <file>',
    descriptionFallback: 'Find patterns in files using regular expressions.',
    examples: ['grep "error" log.txt', 'grep -r "todo" ./src'],
    category: 'text_processing',
    riskLevel: 'safe',
    tldrName: 'grep'
  },
  {
    intent: 'View file content',
    aliases: ['cat', 'type file', 'print file contents', 'display file content', 'show file contents'],
    windows: 'type <file>',
    linux: 'cat <file>',
    mac: 'cat <file>',
    descriptionFallback: 'Print and concatenate files.',
    examples: ['cat file.txt', 'type log.txt'],
    category: 'text_processing',
    riskLevel: 'safe',
    tldrName: 'cat'
  },
  {
    intent: 'View end of file',
    aliases: ['tail', 'show last lines of file', 'monitor log changes', 'tail -f log'],
    windows: 'Get-Content <file> -Tail <lines>',
    linux: 'tail -n <lines> <file>',
    mac: 'tail -n <lines> <file>',
    descriptionFallback: 'Display the last part of a file.',
    examples: ['tail -n 20 log.txt', 'tail -f log.txt'],
    category: 'text_processing',
    riskLevel: 'safe',
    tldrName: 'tail'
  },
  {
    intent: 'View beginning of file',
    aliases: ['head', 'show first lines of file', 'head log', 'print file header'],
    windows: 'Get-Content <file> -TotalCount <lines>',
    linux: 'head -n <lines> <file>',
    mac: 'head -n <lines> <file>',
    descriptionFallback: 'Display the first part of a file.',
    examples: ['head -n 20 file.txt'],
    category: 'text_processing',
    riskLevel: 'safe',
    tldrName: 'head'
  },
  {
    intent: 'Write message to screen',
    aliases: ['echo', 'print message', 'echo text', 'write console output'],
    windows: 'echo <message>',
    linux: 'echo <message>',
    mac: 'echo <message>',
    descriptionFallback: 'Print the given arguments to standard output.',
    examples: ['echo "hello world"'],
    category: 'text_processing',
    riskLevel: 'safe',
    tldrName: 'echo'
  },

  // DATABASE
  {
    intent: 'Connect to postgresql',
    aliases: ['psql', 'postgres login', 'connect pg database', 'postgresql cli'],
    windows: 'psql -h <host> -U <user> -d <database>',
    linux: 'psql -h <host> -U <user> -d <database>',
    mac: 'psql -h <host> -U <user> -d <database>',
    descriptionFallback: 'PostgreSQL interactive terminal.',
    examples: ['psql -h localhost -U postgres -d my_db'],
    category: 'database',
    riskLevel: 'safe',
    tldrName: 'psql'
  },
  {
    intent: 'Connect to mysql',
    aliases: ['mysql login', 'connect mysql database', 'mysql cli', 'mariadb connect'],
    windows: 'mysql -h <host> -u <user> -p',
    linux: 'mysql -h <host> -u <user> -p',
    mac: 'mysql -h <host> -u <user> -p',
    descriptionFallback: 'MySQL and MariaDB command-line tool.',
    examples: ['mysql -u root -p'],
    category: 'database',
    riskLevel: 'safe',
    tldrName: 'mysql'
  },
  {
    intent: 'Connect to redis',
    aliases: ['redis-cli', 'redis command line', 'connect redis server', 'redis cli connect'],
    windows: 'redis-cli -h <host> -p <port>',
    linux: 'redis-cli -h <host> -p <port>',
    mac: 'redis-cli -h <host> -p <port>',
    descriptionFallback: 'Redis command-line interface.',
    examples: ['redis-cli', 'redis-cli -h 127.0.0.1 -p 6379'],
    category: 'database',
    riskLevel: 'safe',
    tldrName: 'redis-cli'
  },
  {
    intent: 'Connect to mongodb',
    aliases: ['mongosh', 'mongo shell', 'connect mongodb database', 'mongo connect cli'],
    windows: 'mongosh <connection-string>',
    linux: 'mongosh <connection-string>',
    mac: 'mongosh <connection-string>',
    descriptionFallback: 'MongoDB shell CLI for interacting with database deployments.',
    examples: ['mongosh "mongodb://localhost:27017"'],
    category: 'database',
    riskLevel: 'safe',
    tldrName: 'mongosh'
  },

  // COMPRESSION
  {
    intent: 'Extract tar archive',
    aliases: ['tar xvf', 'extract tarball', 'unzip tar file', 'untar archive'],
    windows: 'tar -xvf <archive.tar>',
    linux: 'tar -xvf <archive.tar>',
    mac: 'tar -xvf <archive.tar>',
    descriptionFallback: 'Archiving utility to extract files from tar archives.',
    examples: ['tar -xvf archive.tar', 'tar -zxvf archive.tar.gz'],
    category: 'compression',
    riskLevel: 'safe',
    tldrName: 'tar'
  },
  {
    intent: 'Create tar archive',
    aliases: ['tar cvf', 'create tarball', 'tar files', 'make tar archive'],
    windows: 'tar -cvf <archive.tar> <files>',
    linux: 'tar -cvf <archive.tar> <files>',
    mac: 'tar -cvf <archive.tar> <files>',
    descriptionFallback: 'Archiving utility to bundle multiple files into an archive.',
    examples: ['tar -cvf archive.tar file1 file2', 'tar -zcvf archive.tar.gz folder'],
    category: 'compression',
    riskLevel: 'safe',
    tldrName: 'tar'
  },
  {
    intent: 'Unzip file',
    aliases: ['unzip archive', 'extract zip', 'expand zip file', 'uncompress zip'],
    windows: 'Expand-Archive -Path <file.zip> -DestinationPath <folder>',
    linux: 'unzip <file.zip>',
    mac: 'unzip <file.zip>',
    descriptionFallback: 'Extract compressed files in a ZIP archive.',
    examples: ['unzip file.zip', 'unzip file.zip -d destination_folder'],
    category: 'compression',
    riskLevel: 'safe',
    tldrName: 'unzip'
  },

  // GIT ADVANCED
  {
    intent: 'Git log info',
    aliases: ['git log', 'show commit history', 'git commits list', 'view git commits'],
    windows: 'git log --oneline',
    linux: 'git log --oneline',
    mac: 'git log --oneline',
    descriptionFallback: 'Show commit logs.',
    examples: ['git log --oneline', 'git log -n 5'],
    category: 'git',
    riskLevel: 'safe',
    tldrName: 'git-log'
  },
  {
    intent: 'List git branches',
    aliases: ['git branch', 'show branches', 'list branches git', 'git local branches'],
    windows: 'git branch',
    linux: 'git branch',
    mac: 'git branch',
    descriptionFallback: 'List, create, or delete branches.',
    examples: ['git branch', 'git branch -a'],
    category: 'git',
    riskLevel: 'safe',
    tldrName: 'git-branch'
  },
  {
    intent: 'Merge git branch',
    aliases: ['git merge', 'merge branches', 'integrate branch', 'git branch merge'],
    windows: 'git merge <branch>',
    linux: 'git merge <branch>',
    mac: 'git merge <branch>',
    descriptionFallback: 'Join two or more development histories together.',
    examples: ['git merge main', 'git merge feature-branch'],
    category: 'git',
    riskLevel: 'medium',
    tldrName: 'git-merge'
  },
  {
    intent: 'Rebase git branch',
    aliases: ['git rebase', 'git branch rebase', 'rebase commits', 'interactive rebase'],
    windows: 'git rebase <branch>',
    linux: 'git rebase <branch>',
    mac: 'git rebase <branch>',
    descriptionFallback: 'Reapply commits on top of another base tip.',
    examples: ['git rebase main', 'git rebase -i HEAD~3'],
    category: 'git',
    riskLevel: 'high',
    tldrName: 'git-rebase'
  },
  {
    intent: 'Stash git changes',
    aliases: ['git stash', 'stash local changes', 'git save state', 'git stash save'],
    windows: 'git stash',
    linux: 'git stash',
    mac: 'git stash',
    descriptionFallback: 'Stash the changes in a dirty working directory away.',
    examples: ['git stash', 'git stash save "temp work"'],
    category: 'git',
    riskLevel: 'safe',
    tldrName: 'git-stash'
  },
  {
    intent: 'Pop stashed changes',
    aliases: ['git stash pop', 'restore stashed changes', 'apply stash', 'git pop stash'],
    windows: 'git stash pop',
    linux: 'git stash pop',
    mac: 'git stash pop',
    descriptionFallback: 'Remove a single stashed state from the stash list and apply it.',
    examples: ['git stash pop'],
    category: 'git',
    riskLevel: 'safe',
    tldrName: 'git-stash'
  },
  {
    intent: 'Discard local changes',
    aliases: ['git reset --hard', 'hard reset git', 'discard git modifications', 'revert working directory'],
    windows: 'git reset --hard',
    linux: 'git reset --hard',
    mac: 'git reset --hard',
    descriptionFallback: 'Resets the current HEAD to the specified state, discarding any local modifications.',
    examples: ['git reset --hard HEAD', 'git reset --hard origin/main'],
    category: 'git',
    riskLevel: 'critical',
    tldrName: 'git-reset'
  },
  {
    intent: 'Show git diff',
    aliases: ['git diff', 'view file differences', 'git changes diff', 'compare files git'],
    windows: 'git diff',
    linux: 'git diff',
    mac: 'git diff',
    descriptionFallback: 'Show changes between commits, commit and working tree, etc.',
    examples: ['git diff', 'git diff main feature-branch'],
    category: 'git',
    riskLevel: 'safe',
    tldrName: 'git-diff'
  },

  // DOCKER ADVANCED
  {
    intent: 'List docker images',
    aliases: ['docker images', 'show docker images', 'view local images', 'docker image list'],
    windows: 'docker images',
    linux: 'docker images',
    mac: 'docker images',
    descriptionFallback: 'List docker images.',
    examples: ['docker images'],
    category: 'docker',
    riskLevel: 'safe',
    tldrName: 'docker-images'
  },
  {
    intent: 'Remove docker container',
    aliases: ['docker rm', 'delete container', 'remove container by id', 'destroy container'],
    windows: 'docker rm <container-id>',
    linux: 'docker rm <container-id>',
    mac: 'docker rm <container-id>',
    descriptionFallback: 'Remove one or more containers.',
    examples: ['docker rm abc12345', 'docker rm $(docker ps -a -q)'],
    category: 'docker',
    riskLevel: 'medium',
    tldrName: 'docker-rm'
  },
  {
    intent: 'Remove docker image',
    aliases: ['docker rmi', 'delete image', 'remove image by id', 'destroy docker image'],
    windows: 'docker rmi <image-id>',
    linux: 'docker rmi <image-id>',
    mac: 'docker rmi <image-id>',
    descriptionFallback: 'Remove one or more images.',
    examples: ['docker rmi nginx', 'docker rmi abc12345'],
    category: 'docker',
    riskLevel: 'medium',
    tldrName: 'docker-rmi'
  },
  {
    intent: 'Docker compose up',
    aliases: ['docker-compose up', 'start docker compose services', 'compose start', 'docker compose run'],
    windows: 'docker compose up -d',
    linux: 'docker compose up -d',
    mac: 'docker compose up -d',
    descriptionFallback: 'Create and start containers defined in docker-compose.yml.',
    examples: ['docker compose up', 'docker compose up -d'],
    category: 'docker',
    riskLevel: 'medium',
    tldrName: 'docker-compose'
  },
  {
    intent: 'Docker compose down',
    aliases: ['docker-compose down', 'stop docker compose services', 'compose stop', 'docker compose stop'],
    windows: 'docker compose down',
    linux: 'docker compose down',
    mac: 'docker compose down',
    descriptionFallback: 'Stop and remove containers, networks, images, and volumes.',
    examples: ['docker compose down', 'docker compose down --volumes'],
    category: 'docker',
    riskLevel: 'medium',
    tldrName: 'docker-compose'
  },

  // KUBERNETES ADVANCED
  {
    intent: 'Kubernetes port forward',
    aliases: ['kubectl port-forward', 'forward local port', 'access pod port', 'k8s port forward'],
    windows: 'kubectl port-forward <pod-name> <local-port>:<pod-port>',
    linux: 'kubectl port-forward <pod-name> <local-port>:<pod-port>',
    mac: 'kubectl port-forward <pod-name> <local-port>:<pod-port>',
    descriptionFallback: 'Forward one or more local ports to a pod.',
    examples: ['kubectl port-forward my-pod 8080:80'],
    category: 'kubernetes',
    riskLevel: 'safe',
    tldrName: 'kubectl'
  },
  {
    intent: 'Kubernetes run pod',
    aliases: ['kubectl run', 'create new pod', 'kubernetes spawn container', 'k8s run pod'],
    windows: 'kubectl run <pod-name> --image=<image-name>',
    linux: 'kubectl run <pod-name> --image=<image-name>',
    mac: 'kubectl run <pod-name> --image=<image-name>',
    descriptionFallback: 'Create and run a particular image in a pod.',
    examples: ['kubectl run nginx --image=nginx'],
    category: 'kubernetes',
    riskLevel: 'medium',
    tldrName: 'kubectl'
  },
  {
    intent: 'Get kubernetes namespaces',
    aliases: ['kubectl get ns', 'list namespaces', 'show k8s namespaces', 'kubernetes namespaces'],
    windows: 'kubectl get namespaces',
    linux: 'kubectl get namespaces',
    mac: 'kubectl get namespaces',
    descriptionFallback: 'List namespaces in the Kubernetes cluster.',
    examples: ['kubectl get namespaces'],
    category: 'kubernetes',
    riskLevel: 'safe',
    tldrName: 'kubectl'
  },

  // DEVELOPER UTILITIES
  {
    intent: 'Pip install python library',
    aliases: ['pip install', 'python package install', 'install python library', 'pip add'],
    windows: 'pip install <package>',
    linux: 'pip install <package>',
    mac: 'pip install <package>',
    descriptionFallback: 'Install packages from the Python Package Index (PyPI).',
    examples: ['pip install requests', 'pip install numpy'],
    category: 'package_management',
    riskLevel: 'safe',
    tldrName: 'pip-install'
  },
  {
    intent: 'Run python script',
    aliases: ['python run', 'execute python file', 'python command', 'start python app'],
    windows: 'python <script.py>',
    linux: 'python <script.py>',
    mac: 'python <script.py>',
    descriptionFallback: 'Python interpreter to run python scripts.',
    examples: ['python main.py'],
    category: 'system_administration',
    riskLevel: 'safe',
    tldrName: 'python'
  },
  {
    intent: 'Run node script',
    aliases: ['node run', 'execute js file', 'node command', 'start node app'],
    windows: 'node <file.js>',
    linux: 'node <file.js>',
    mac: 'node <file.js>',
    descriptionFallback: 'Node.js command-line interface to execute JavaScript files.',
    examples: ['node index.js'],
    category: 'system_administration',
    riskLevel: 'safe',
    tldrName: 'node'
  },
  {
    intent: 'Force delete folder recursively',
    aliases: ['rm -rf', 'delete directory recursively', 'remove folder containing files', 'force delete folder'],
    windows: 'rd /s /q <folder>',
    linux: 'rm -rf <folder>',
    mac: 'rm -rf <folder>',
    descriptionFallback: 'Remove files or directories recursively and forcefully.',
    examples: ['rm -rf node_modules', 'rd /s /q build'],
    category: 'filesystem',
    riskLevel: 'critical',
    tldrName: 'rm'
  },
  {
    intent: 'Format disk partition',
    aliases: ['format drive', 'wipe disk partition', 'format disk', 'create file system'],
    windows: 'format <drive-letter>:',
    linux: 'mkfs -t <type> <partition>',
    mac: 'diskutil eraseVolume <format> <name> <device>',
    descriptionFallback: 'Wipe and format a disk partition or drive with a new file system.',
    examples: ['format E:', 'mkfs -t ext4 /dev/sdb1'],
    category: 'system_administration',
    riskLevel: 'critical',
    tldrName: 'format'
  }
];

/**
 * Attempt to fetch and parse command description / examples from TLDR pages.
 * Returns the description or null if fetch fails.
 */
async function fetchTldrData(commandName: string): Promise<{ description?: string; examples?: string[] } | null> {
  // Use a common fallback category (usually common or linux/osx)
  const platforms = ['common', 'linux', 'osx', 'windows'];
  
  for (const plat of platforms) {
    const url = `https://raw.githubusercontent.com/tldr-pages/tldr/main/pages/${plat}/${commandName}.md`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const text = await response.text();
        // Parse description
        const lines = text.split('\n');
        const descLines: string[] = [];
        const examples: string[] = [];
        
        let foundTitle = false;
        for (const line of lines) {
          if (line.startsWith('# ')) {
            foundTitle = true;
          } else if (foundTitle && line.startsWith('> ')) {
            const cleanDesc = line.replace(/^>\s*/, '').trim();
            if (!cleanDesc.startsWith('More information:')) {
              descLines.push(cleanDesc);
            }
          } else if (line.startsWith('`') && line.endsWith('`')) {
            examples.push(line.replace(/`/g, '').trim());
          }
        }
        
        const result: { description?: string; examples?: string[] } = {
          description: descLines.join(' ')
        };
        if (examples.length > 0) {
          result.examples = examples;
        }
        return result;
      }
    } catch (e) {
      // Ignore network errors and try next platform/fail silently
    }
  }
  return null;
}

/**
 * Loads all commands by merging static definitions with fetched details where available.
 */
export async function getRawCommandEntries(): Promise<CommandEntry[]> {
  const entries: CommandEntry[] = [];
  
  console.log(`Processing ${baseCommands.length} command sources...`);
  
  for (const cmd of baseCommands) {
    let description = cmd.descriptionFallback;
    let examples = cmd.examples;
    
    if (cmd.tldrName) {
      const tldr = await fetchTldrData(cmd.tldrName);
      if (tldr) {
        if (tldr.description) {
          description = tldr.description;
        }
        if (tldr.examples) {
          examples = [...new Set([...examples, ...tldr.examples])];
        }
      }
    }
    
    // Create initial slug id from intent
    const id = cmd.intent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    entries.push({
      id,
      intent: cmd.intent,
      aliases: cmd.aliases,
      windows: cmd.windows,
      linux: cmd.linux,
      mac: cmd.mac,
      description,
      examples,
      category: cmd.category,
      riskLevel: cmd.riskLevel
    });
  }
  
  return entries;
}
