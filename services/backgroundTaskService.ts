import EventEmitter from 'eventemitter3';

class BackgroundTaskService extends EventEmitter {
    private timer: NodeJS.Timeout | null = null;
    private progress = 0;

    startTask() {
        this.progress = 0;

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.timer = setInterval(() => {
            if (this.progress >= 15) {
                this.stopTask();
            } else {
                this.progress++;
                this.emit('PROGRESS_EVENT', this.progress);
            }
        }, 1000); // co 1 sek
    }

    stopTask() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.emit('FINISH_EVENT', this.progress);
    }
}

export const backgroundTaskService = new BackgroundTaskService();