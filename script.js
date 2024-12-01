class DDCMUNManager {
    constructor() {
        this.committee = '';
        this.topic = '';
        this.presentCount = 0;
        this.totalCount = 0;
        this.delegates = [];
        this.presentDelegates = [];
        this.speakersList = [];
        this.timerInterval = null;
        this.timeLeft = 0;
        this.totalTime = 0;
        this.isTimerRunning = false;
        this.recentSessions = [];
        this.currentListType = 'None';
        this.currentSession = null;

        this.initializeElements();
        this.setupEventListeners();
        this.setupPopup();
        this.loadRecentSessions();
    }

    initializeElements() {
        // Pages
        this.homePage = document.getElementById('home-page');
        this.sessionPage = document.getElementById('session-page');

        // Form elements
        this.newSessionForm = document.getElementById('new-session-form');
        this.sessionsListElement = document.querySelector('.sessions-list');
        this.delegatesListTextarea = document.getElementById('delegates-list');

        // File handling elements
        this.loadSessionFile = document.getElementById('load-session-file');
        this.loadSessionBtn = document.getElementById('load-session-btn');
        this.saveSessionBtn = document.getElementById('save-session-btn');

        // Display elements
        this.committeeDisplay = document.getElementById('committee-display');
        this.topicDisplay = document.getElementById('topic-display');
        this.presentCountDisplay = document.getElementById('present-count');
        this.totalCountDisplay = document.getElementById('total-count');
        this.timerDisplay = document.getElementById('timer');
        this.speakersListElement = document.getElementById('speakers-list');
        this.currentListTypeDisplay = document.getElementById('current-list-type');
        this.presentDelegatesElement = document.getElementById('present-delegates');

        // Input elements
        this.minutesInput = document.getElementById('minutes');
        this.secondsInput = document.getElementById('seconds');
        this.delegateSearchInput = document.getElementById('delegate-search');

        // Buttons
        this.resumeBtn = document.getElementById('resume-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.nextSpeakerBtn = document.getElementById('next-speaker-btn');
        this.clearBtn = document.getElementById('clear-btn');
        this.backToHomeBtn = document.getElementById('back-to-home');
        this.addToListBtn = document.getElementById('add-to-list-btn');
        this.markAbsentBtn = document.getElementById('mark-absent-btn');
        this.markPresentBtn = document.getElementById('mark-present-btn');
        this.gslBtn = document.getElementById('gsl-btn');
        this.singleSpeakerBtn = document.getElementById('single-speaker-btn');
        this.moderatedBtn = document.getElementById('moderated-btn');
        this.unmoderatedBtn = document.getElementById('unmoderated-btn');
        this.votingBtn = document.getElementById('voting-btn');
    }

    setupEventListeners() {
        // Form submission
        this.newSessionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createNewSession();
        });

        // Back to home button
        this.backToHomeBtn.addEventListener('click', () => this.showHomePage());

        // Timer control buttons
        this.resumeBtn.addEventListener('click', () => this.startTimer());
        this.pauseBtn.addEventListener('click', () => this.pauseTimer());
        this.stopBtn.addEventListener('click', () => this.stopTimer());
        this.clearBtn.addEventListener('click', () => this.clearSpeakersList());
        this.nextSpeakerBtn.addEventListener('click', () => this.nextSpeaker());

        // Delegate management buttons
        this.addToListBtn.addEventListener('click', () => this.addSelectedDelegatesToList());
        this.markAbsentBtn.addEventListener('click', () => this.markDelegatesAbsent());
        this.markPresentBtn.addEventListener('click', () => this.markDelegatesPresent());

        // Debate type buttons
        this.gslBtn.addEventListener('click', () => this.setListType('General Speakers List'));
        this.singleSpeakerBtn.addEventListener('click', () => this.setListType('Single Speaker'));
        this.moderatedBtn.addEventListener('click', () => this.setListType('Moderated Caucus'));
        this.unmoderatedBtn.addEventListener('click', () => this.setListType('Unmoderated Caucus'));
        this.votingBtn.addEventListener('click', () => this.setListType('Voting Procedure'));

        // Delegate search
        this.delegateSearchInput.addEventListener('input', () => this.filterDelegates());

        // Time input validation
        this.minutesInput.addEventListener('change', () => this.validateTimeInput(this.minutesInput, 59));
        this.secondsInput.addEventListener('change', () => this.validateTimeInput(this.secondsInput, 59));

        // File handling
        this.loadSessionBtn.addEventListener('click', () => this.loadSessionFile.click());
        this.loadSessionFile.addEventListener('change', (e) => this.handleFileLoad(e));
        this.saveSessionBtn.addEventListener('click', () => this.saveSessionToFile());
    }

    setupPopup() {
        this.popupOverlay = document.getElementById('popup-overlay');
        this.popupTitle = document.getElementById('popup-title');
        this.popupMessage = document.getElementById('popup-message');
        this.popupConfirm = document.getElementById('popup-confirm');
        this.popupCancel = document.getElementById('popup-cancel');

        // Close popup when clicking outside
        this.popupOverlay.addEventListener('click', (e) => {
            if (e.target === this.popupOverlay) {
                this.hidePopup();
            }
        });

        // Close popup when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popupOverlay.classList.contains('active')) {
                this.hidePopup();
            }
        });
    }

    showPopup(options) {
        const defaults = {
            title: 'Message',
            message: '',
            type: 'info', // 'info', 'error', 'success'
            showCancel: true,
            confirmText: 'Confirm',
            cancelText: 'Cancel',
            onConfirm: () => {},
            onCancel: () => {}
        };

        const settings = { ...defaults, ...options };

        this.popupTitle.textContent = settings.title;
        this.popupMessage.textContent = settings.message;
        
        // Reset popup class and add type-specific class
        this.popupOverlay.querySelector('.popup').className = 'popup ' + settings.type;
        
        // Configure buttons
        this.popupConfirm.textContent = settings.confirmText;
        this.popupCancel.textContent = settings.cancelText;
        this.popupCancel.style.display = settings.showCancel ? 'block' : 'none';

        // Setup button handlers
        this.popupConfirm.onclick = () => {
            settings.onConfirm();
            this.hidePopup();
        };
        this.popupCancel.onclick = () => {
            settings.onCancel();
            this.hidePopup();
        };

        // Show popup
        this.popupOverlay.classList.add('active');
        setTimeout(() => {
            this.popupOverlay.querySelector('.popup').style.opacity = '1';
        }, 10);
    }

    hidePopup() {
        this.popupOverlay.classList.remove('active');
    }

    loadRecentSessions() {
        const savedSessions = localStorage.getItem('recentSessions');
        if (savedSessions) {
            this.recentSessions = JSON.parse(savedSessions);
            this.updateRecentSessionsList();
        }
    }

    saveRecentSessions() {
        localStorage.setItem('recentSessions', JSON.stringify(this.recentSessions));
    }

    updateRecentSessionsList() {
        this.sessionsListElement.innerHTML = '';
        this.recentSessions.forEach((session, index) => {
            const sessionElement = document.createElement('div');
            sessionElement.className = 'session-item';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'session-item-content';
            contentDiv.innerHTML = `
                <h3>${session.committee}</h3>
                <p>Topic: ${session.topic}</p>
                <p>Delegates: ${session.totalCount}</p>
                <p>Created: ${new Date(session.created).toLocaleDateString()}</p>
            `;
            contentDiv.addEventListener('click', () => this.loadSession(session));
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'session-item-actions';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-session-btn';
            deleteBtn.textContent = '×';
            deleteBtn.title = 'Delete Session';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteSession(index);
            });
            
            actionsDiv.appendChild(deleteBtn);
            sessionElement.appendChild(contentDiv);
            sessionElement.appendChild(actionsDiv);
            this.sessionsListElement.appendChild(sessionElement);
        });
    }

    deleteSession(index) {
        this.showPopup({
            title: 'Delete Session',
            message: 'Are you sure you want to delete this session?',
            type: 'error',
            confirmText: 'Delete',
            onConfirm: () => {
                this.recentSessions.splice(index, 1);
                this.saveRecentSessions();
                this.updateRecentSessionsList();
            }
        });
    }

    createNewSession() {
        const committee = document.getElementById('committee-name').value;
        const topic = document.getElementById('agenda-item').value;
        const delegatesList = this.delegatesListTextarea.value
            .split('\n')
            .map(d => d.trim())
            .filter(d => d.length > 0);

        if (delegatesList.length === 0) {
            this.showPopup({
                title: 'Invalid Input',
                message: 'Please enter at least one delegate.',
                type: 'error',
                showCancel: false,
                confirmText: 'OK'
            });
            return;
        }

        const session = {
            committee,
            topic,
            totalCount: delegatesList.length,
            presentCount: delegatesList.length,
            delegates: delegatesList,
            presentDelegates: [...delegatesList],
            speakersList: [],
            currentListType: 'None',
            created: new Date().toISOString()
        };

        this.recentSessions.unshift(session);
        if (this.recentSessions.length > 5) {
            this.recentSessions.pop();
        }
        this.saveRecentSessions();
        this.loadSession(session);
    }

    loadSession(session) {
        this.currentSession = session;
        this.committee = session.committee;
        this.topic = session.topic;
        this.totalCount = session.totalCount;
        this.presentCount = session.presentCount;
        this.delegates = session.delegates;
        this.presentDelegates = session.presentDelegates || [...session.delegates];
        this.speakersList = session.speakersList || [];
        this.currentListType = session.currentListType || 'None';
        
        this.updateDisplay();
        this.updatePresentDelegatesList();
        this.updateSpeakersListDisplay();
        this.showSessionPage();
    }

    showHomePage() {
        this.stopTimer();
        this.sessionPage.classList.add('hidden');
        this.homePage.classList.remove('hidden');
    }

    showSessionPage() {
        this.homePage.classList.add('hidden');
        this.sessionPage.classList.remove('hidden');
    }

    updateDisplay() {
        this.committeeDisplay.textContent = this.committee;
        this.topicDisplay.textContent = this.topic;
        this.presentCountDisplay.textContent = this.presentCount;
        this.totalCountDisplay.textContent = this.totalCount;
    }

    updatePresentDelegatesList() {
        // Get all absent delegates
        const absentDelegates = this.delegates.filter(delegate => !this.presentDelegates.includes(delegate));
        
        this.presentDelegatesElement.innerHTML = '';
        
        // First add present delegates
        this.presentDelegates.forEach(delegate => {
            const delegateElement = document.createElement('div');
            delegateElement.className = 'delegate-item';
            delegateElement.innerHTML = `
                <input type="checkbox" value="${delegate}">
                <span>${delegate}</span>
            `;
            delegateElement.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') {
                    const checkbox = delegateElement.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                }
                this.updateDelegateSelection(delegateElement);
            });
            this.presentDelegatesElement.appendChild(delegateElement);
        });

        // Then add absent delegates with a different style
        absentDelegates.forEach(delegate => {
            const delegateElement = document.createElement('div');
            delegateElement.className = 'delegate-item absent';
            delegateElement.innerHTML = `
                <input type="checkbox" value="${delegate}">
                <span>${delegate}</span>
            `;
            delegateElement.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') {
                    const checkbox = delegateElement.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                }
                this.updateDelegateSelection(delegateElement);
            });
            this.presentDelegatesElement.appendChild(delegateElement);
        });

        // Update the search if there's a current search term
        if (this.delegateSearchInput.value) {
            this.filterDelegates(this.delegateSearchInput.value);
        }
    }

    updateDelegateSelection(element) {
        element.classList.toggle('selected', element.querySelector('input[type="checkbox"]').checked);
    }

    getSelectedDelegates() {
        const selectedElements = this.presentDelegatesElement.querySelectorAll('.delegate-item input[type="checkbox"]:checked');
        return Array.from(selectedElements).map(checkbox => checkbox.value);
    }

    addSelectedDelegatesToList() {
        const selectedDelegates = this.getSelectedDelegates();
        if (selectedDelegates.length === 0) {
            this.showPopup({
                title: 'Invalid Input',
                message: 'Please select at least one delegate.',
                type: 'error',
                showCancel: false,
                confirmText: 'OK'
            });
            return;
        }

        this.speakersList.push(...selectedDelegates);
        this.updateSpeakersListDisplay();

        // Clear selections
        this.presentDelegatesElement.querySelectorAll('.delegate-item.selected')
            .forEach(el => el.classList.remove('selected'));
    }

    markDelegatesAbsent() {
        const selectedDelegates = this.getSelectedDelegates();
        if (selectedDelegates.length === 0) {
            this.showPopup({
                title: 'Invalid Input',
                message: 'Please select at least one delegate.',
                type: 'error',
                showCancel: false,
                confirmText: 'OK'
            });
            return;
        }

        this.presentDelegates = this.presentDelegates.filter(d => !selectedDelegates.includes(d));
        this.presentCount = this.presentDelegates.length;
        this.updateDisplay();
        this.updatePresentDelegatesList();
    }

    markDelegatesPresent() {
        const selectedDelegates = this.getSelectedDelegates();
        if (selectedDelegates.length === 0) {
            this.showPopup({
                title: 'Invalid Selection',
                message: 'Please select at least one delegate.',
                type: 'error',
                showCancel: false,
                confirmText: 'OK'
            });
            return;
        }

        // Get all absent delegates
        const absentDelegates = this.delegates.filter(delegate => !this.presentDelegates.includes(delegate));
        
        // Filter selected delegates to only include those who are absent
        const delegatesToMarkPresent = selectedDelegates.filter(delegate => absentDelegates.includes(delegate));

        if (delegatesToMarkPresent.length === 0) {
            this.showPopup({
                title: 'Already Present',
                message: 'All selected delegates are already marked as present.',
                type: 'info',
                showCancel: false,
                confirmText: 'OK'
            });
            return;
        }

        // Add the delegates back to presentDelegates
        this.presentDelegates.push(...delegatesToMarkPresent);
        this.presentCount = this.presentDelegates.length;

        // Update displays
        this.updatePresentDelegatesList();
        this.updateDisplay();

        // Show success message
        this.showPopup({
            title: 'Delegates Marked Present',
            message: `Successfully marked ${delegatesToMarkPresent.length} delegate(s) as present.`,
            type: 'success',
            showCancel: false,
            confirmText: 'OK'
        });
    }

    filterDelegates() {
        const searchTerm = this.delegateSearchInput.value.toLowerCase();
        const delegateItems = this.presentDelegatesElement.querySelectorAll('.delegate-item');
        
        delegateItems.forEach(item => {
            const delegateName = item.querySelector('span').textContent.toLowerCase();
            item.style.display = delegateName.includes(searchTerm) ? '' : 'none';
        });
    }

    setListType(type) {
        this.currentListType = type;
        this.currentListTypeDisplay.textContent = type;
        this.clearSpeakersList();
        
        // Reset timer for new list type
        this.stopTimer();
        
        // Update UI based on list type
        this.addToListBtn.textContent = type === 'Unmoderated Caucus' ? 
            'Start Unmod' : 'Add to List';
    }

    updateSpeakersListDisplay() {
        this.speakersListElement.innerHTML = '';
        this.speakersList.forEach((delegate, index) => {
            const div = document.createElement('div');
            div.textContent = `${index + 1}. ${delegate}`;
            div.className = 'speaker-item';
            this.speakersListElement.appendChild(div);
        });
    }

    validateTimeInput(input, max) {
        let value = parseInt(input.value);
        if (isNaN(value) || value < 0) value = 0;
        if (value > max) value = max;
        input.value = value;
    }

    startTimer() {
        if (this.isTimerRunning) return;

        if (!this.timeLeft) {
            const minutes = parseInt(this.minutesInput.value) || 0;
            const seconds = parseInt(this.secondsInput.value) || 0;
            this.timeLeft = this.totalTime = (minutes * 60 + seconds) * 1000;
        }

        this.isTimerRunning = true;
        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            this.timeLeft -= 1000;
            if (this.timeLeft <= 0) {
                this.stopTimer();
                this.showPopup({
                    title: 'Time is up!',
                    message: '',
                    type: 'info',
                    showCancel: false,
                    confirmText: 'OK'
                });
            } else {
                this.updateTimerDisplay();
            }
        }, 1000);
    }

    pauseTimer() {
        this.isTimerRunning = false;
        clearInterval(this.timerInterval);
    }

    stopTimer() {
        this.isTimerRunning = false;
        clearInterval(this.timerInterval);
        this.timeLeft = 0;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const timeLeftSeconds = Math.ceil(this.timeLeft / 1000);
        const totalTimeSeconds = Math.ceil(this.totalTime / 1000);
        
        const timeLeftStr = this.formatTime(timeLeftSeconds);
        const totalTimeStr = this.formatTime(totalTimeSeconds);
        
        this.timerDisplay.textContent = `${timeLeftStr} / ${totalTimeStr}`;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    nextSpeaker() {
        if (this.speakersList.length > 0) {
            this.speakersList.shift();
            this.updateSpeakersListDisplay();
            this.stopTimer();
        }
    }

    clearSpeakersList() {
        this.speakersList = [];
        this.updateSpeakersListDisplay();
    }

    saveSessionToFile() {
        if (!this.currentSession) return;

        // Create current session state
        const sessionState = {
            ...this.currentSession,
            presentDelegates: this.presentDelegates,
            speakersList: this.speakersList,
            currentListType: this.currentListType,
            lastSaved: new Date().toISOString()
        };

        // Create blob and download
        const blob = new Blob([JSON.stringify(sessionState, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.committee.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.ddcmun`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    handleFileLoad(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const session = JSON.parse(e.target.result);
                this.loadSession(session);
                
                // Add to recent sessions if not already present
                if (!this.recentSessions.some(s => s.created === session.created)) {
                    this.recentSessions.unshift(session);
                    if (this.recentSessions.length > 5) {
                        this.recentSessions.pop();
                    }
                    this.saveRecentSessions();
                }
            } catch (error) {
                this.showPopup({
                    title: 'Error Loading File',
                    message: 'Please make sure it is a valid .ddcmun file.',
                    type: 'error',
                    showCancel: false,
                    confirmText: 'OK'
                });
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.ddcmun = new DDCMUNManager();
});
