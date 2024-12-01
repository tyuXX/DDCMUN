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
        this.timerSound = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');

        this.initializeElements();
        this.setupEventListeners();
        this.setupPopup();
        this.loadRecentSessions();
        
        // Initialize list type
        if (this.currentListTypeDisplay) {
            this.currentListTypeDisplay.textContent = this.currentListType;
        }
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

        // Timer buttons
        this.resumeBtn = document.getElementById('resume-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.timerPresetBtns = document.querySelectorAll('.timer-presets button');

        // List management buttons
        this.nextSpeakerBtn = document.getElementById('next-speaker-btn');
        this.clearListBtn = document.getElementById('clear-list-btn');
        this.backToHomeBtn = document.getElementById('back-to-home');
        this.addToListBtn = document.getElementById('add-to-list-btn');
        this.markAbsentBtn = document.getElementById('mark-absent-btn');
        this.markPresentBtn = document.getElementById('mark-present-btn');

        // Debate type buttons
        this.gslBtn = document.getElementById('gsl-btn');
        this.singleSpeakerBtn = document.getElementById('single-speaker-btn');
        this.moderatedBtn = document.getElementById('moderated-btn');
        this.unmoderatedBtn = document.getElementById('unmoderated-btn');
        this.votingBtn = document.getElementById('voting-btn');

        // Select all checkbox
        this.selectAllCheckbox = document.getElementById('select-all-delegates');

        // Caucus settings
        this.caucusSettingsElement = document.getElementById('caucus-settings');
        this.caucusTotalTimeInput = document.getElementById('caucus-total-time');
        this.speakerTimeInput = document.getElementById('speaker-time');
    }

    setupEventListeners() {
        // Form submissions
        this.newSessionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createNewSession();
        });

        // Timer controls
        this.resumeBtn.addEventListener('click', () => this.startTimer());
        this.pauseBtn.addEventListener('click', () => this.pauseTimer());
        this.stopBtn.addEventListener('click', () => this.stopTimer());

        // Timer presets
        this.timerPresetBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setTimerPreset(parseInt(btn.dataset.time)));
        });

        // Time input validation
        this.minutesInput.addEventListener('change', () => this.validateTimeInput(this.minutesInput, 59));
        this.secondsInput.addEventListener('change', () => this.validateTimeInput(this.secondsInput, 59));

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

        // List management
        this.nextSpeakerBtn.addEventListener('click', () => this.nextSpeaker());
        this.clearListBtn.addEventListener('click', () => this.clearSpeakersList());
        this.backToHomeBtn.addEventListener('click', () => this.showHomePage());

        // Search
        this.delegateSearchInput.addEventListener('input', () => this.filterDelegates());

        // File handling
        this.loadSessionBtn.addEventListener('click', () => this.loadSessionFile.click());
        this.loadSessionFile.addEventListener('change', (e) => this.handleFileLoad(e));
        this.saveSessionBtn.addEventListener('click', () => this.saveSessionToFile());

        // Select all delegates
        this.selectAllCheckbox.addEventListener('change', () => this.toggleSelectAllDelegates());
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
        const committeeName = document.getElementById('committee-name').value;
        const agendaItem = document.getElementById('agenda-item').value;
        const delegatesList = document.getElementById('delegates-list').value;

        if (!committeeName || !agendaItem || !delegatesList) {
            this.showPopup({
                title: 'Missing Information',
                message: 'Please fill in all fields.',
                type: 'error',
                showCancel: false
            });
            return;
        }

        const delegates = delegatesList.split('\n')
            .map(name => name.trim())
            .filter(name => name)
            .map(name => ({ name, absent: false }));

        const session = {
            committee: committeeName,
            topic: agendaItem,
            delegates: delegates,
            presentDelegates: delegates.map(d => d.name),
            speakersList: [],
            currentListType: 'None',
            created: new Date().toISOString()
        };

        this.loadSession(session);
        this.showSessionPage();
        this.saveRecentSession(session);
    }

    loadSession(session) {
        if (!session) return;

        this.currentSession = session;
        this.committee = session.committee;
        this.topic = session.topic;
        this.delegates = session.delegates || [];
        this.presentDelegates = session.presentDelegates || [];
        this.speakersList = session.speakersList || [];
        this.currentListType = session.currentListType || 'None';
        
        if (this.currentListTypeDisplay) {
            this.currentListTypeDisplay.textContent = this.currentListType;
        }

        this.updateDisplay();
        this.updatePresentDelegatesList();
        this.updateSpeakersListDisplay();
        this.updateListTypeButtons();
        this.updatePresentCount();
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
        const absentDelegates = this.delegates.filter(delegate => !this.presentDelegates.includes(delegate.name));
        
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
                <input type="checkbox" value="${delegate.name}">
                <span>${delegate.name}</span>
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
                title: 'No Selection',
                message: 'Please select at least one delegate.',
                type: 'error',
                showCancel: false,
                confirmText: 'OK'
            });
            return;
        }

        // Add selected delegates to speakers list
        this.speakersList.push(...selectedDelegates);
        
        // Uncheck all checkboxes and update selection
        const checkboxes = this.presentDelegatesElement.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            this.updateDelegateSelection(checkbox.closest('.delegate-item'));
        });
        this.selectAllCheckbox.checked = false;

        this.updateSpeakersListDisplay();
    }

    validateTimeInput(input, max) {
        let value = parseInt(input.value);
        
        // If not a number or less than 0, reset to 0
        if (isNaN(value) || value < 0) {
            input.value = 0;
            value = 0;
        }
        
        // If greater than max, set to max
        if (value > max) {
            input.value = max;
        }
    }

    startTimer() {
        // Stop any existing timer
        this.stopTimer();

        // Get minutes and seconds from inputs
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;
        
        // Calculate total remaining time
        this.timeRemaining = minutes * 60 + seconds;

        // Caucus-specific timer logic
        if (this.currentListType === 'Moderated Caucus' || this.currentListType === 'Unmoderated Caucus') {
            // Get caucus total time and speaker time
            const caucusTotalTime = parseInt(this.caucusTotalTimeInput.value) * 60 || 600; // Default 10 minutes
            const speakerTime = parseInt(this.speakerTimeInput.value) || 60; // Default 60 seconds

            // Set up caucus-specific timer state
            this.caucusTotalTimeRemaining = caucusTotalTime;
            this.currentSpeakerTimeRemaining = speakerTime;
            this.speakerCount = 0;
        }

        // Validate time
        if (this.timeRemaining <= 0) {
            this.showPopup({
                title: 'Invalid Time',
                message: 'Please set a time greater than 0.',
                type: 'error',
                showCancel: false
            });
            return;
        }

        // Set timer state
        this.timerRunning = true;
        this.timerPaused = false;
        this.resumeBtn.textContent = 'Resume';
        
        // Update initial display
        this.updateTimerDisplay();

        // Start timer interval
        this.timerInterval = setInterval(() => {
            if (!this.timerPaused) {
                this.timeRemaining--;
                
                // Caucus-specific time tracking
                if (this.currentListType === 'Moderated Caucus' || this.currentListType === 'Unmoderated Caucus') {
                    this.caucusTotalTimeRemaining--;
                    this.currentSpeakerTimeRemaining--;

                    // Check if current speaker's time is up
                    if (this.currentSpeakerTimeRemaining <= 0) {
                        this.nextSpeaker();
                        
                        // Reset speaker time if more speakers are available
                        if (this.speakersList.length > 0) {
                            this.currentSpeakerTimeRemaining = parseInt(this.speakerTimeInput.value) || 60;
                            this.speakerCount++;
                        }
                    }

                    // Check if total caucus time is up
                    if (this.caucusTotalTimeRemaining <= 0) {
                        this.stopTimer();
                        this.showPopup({
                            title: 'Caucus Ended',
                            message: `${this.currentListType} has ended.`,
                            type: 'info',
                            showCancel: false
                        });
                    }
                }

                this.updateTimerDisplay();

                // Regular timer end check
                if (this.timeRemaining <= 0) {
                    this.stopTimer();
                    this.timerSound.play().catch(() => {
                        console.log('Timer sound could not be played');
                    });
                    this.showPopup({
                        title: 'Time Up',
                        message: 'The timer has finished.',
                        type: 'info',
                        showCancel: false
                    });
                }
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
        this.timerPaused = false;
        this.resumeBtn.textContent = 'Start';
        this.timeRemaining = 0;
        this.updateTimerDisplay();
    }

    pauseTimer() {
        if (!this.timerRunning) return;
        this.timerPaused = !this.timerPaused;
        this.pauseBtn.textContent = this.timerPaused ? 'Resume' : 'Pause';
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const totalMinutes = Math.floor((parseInt(this.minutesInput.value) || 0) * 60 + (parseInt(this.secondsInput.value) || 0)) / 60;
        const totalSeconds = (parseInt(this.minutesInput.value) || 0) * 60 + (parseInt(this.secondsInput.value) || 0);
        
        // Default timer display
        let displayText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} / ${String(Math.floor(totalMinutes)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
        
        // Caucus-specific display
        if (this.currentListType === 'Moderated Caucus' || this.currentListType === 'Unmoderated Caucus') {
            const caucusMinutes = Math.floor(this.caucusTotalTimeRemaining / 60);
            const caucusSeconds = this.caucusTotalTimeRemaining % 60;
            const speakerMinutes = Math.floor(this.currentSpeakerTimeRemaining / 60);
            const speakerSeconds = this.currentSpeakerTimeRemaining % 60;
            
            displayText = `Caucus: ${String(caucusMinutes).padStart(2, '0')}:${String(caucusSeconds).padStart(2, '0')} | Speaker: ${String(speakerMinutes).padStart(2, '0')}:${String(speakerSeconds).padStart(2, '0')}`;
        }
        
        this.timerDisplay.textContent = displayText;
    }

    setTimerPreset(seconds) {
        // Stop any existing timer
        this.stopTimer();
        
        // Calculate minutes and remaining seconds
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        
        // Set input values
        this.minutesInput.value = mins;
        this.secondsInput.value = secs;
        
        // Start the timer
        this.startTimer();
    }

    toggleSelectAllDelegates() {
        const isChecked = this.selectAllCheckbox.checked;
        const checkboxes = this.presentDelegatesElement.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
            this.updateDelegateSelection(checkbox.closest('.delegate-item'));
        });
    }

    updateListTypeButtons() {
        // Remove active class from all list type buttons
        [this.gslBtn, this.singleSpeakerBtn, this.moderatedBtn, this.unmoderatedBtn, this.votingBtn].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        // Add active class to current list type button
        switch (this.currentListType) {
            case 'General Speakers List':
                this.gslBtn.classList.add('active');
                break;
            case 'Single Speaker':
                this.singleSpeakerBtn.classList.add('active');
                break;
            case 'Moderated Caucus':
                this.moderatedBtn.classList.add('active');
                break;
            case 'Unmoderated Caucus':
                this.unmoderatedBtn.classList.add('active');
                break;
            case 'Voting Procedure':
                this.votingBtn.classList.add('active');
                break;
        }
    }

    updateSpeakersListDisplay() {
        this.speakersListElement.innerHTML = '';
        this.speakersList.forEach((delegate, index) => {
            const div = document.createElement('div');
            div.textContent = `${index + 1}. ${delegate}`;
            div.className = 'speaker-item';
            this.speakersListElement.appendChild(div);
        });

        // Update buttons state based on list content
        this.nextSpeakerBtn.disabled = this.speakersList.length === 0;
        this.clearListBtn.disabled = this.speakersList.length === 0;
    }

    nextSpeaker() {
        if (this.speakersList.length > 0) {
            this.speakersList.shift();
            this.updateSpeakersListDisplay();
        }
    }

    addSelectedDelegatesToList() {
        const selectedDelegates = this.getSelectedDelegates();
        if (selectedDelegates.length === 0) {
            this.showPopup({
                title: 'No Selection',
                message: 'Please select at least one delegate.',
                type: 'error',
                showCancel: false,
                confirmText: 'OK'
            });
            return;
        }

        // Add selected delegates to speakers list
        this.speakersList.push(...selectedDelegates);
        
        // Uncheck all checkboxes and update selection
        const checkboxes = this.presentDelegatesElement.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            this.updateDelegateSelection(checkbox.closest('.delegate-item'));
        });
        this.selectAllCheckbox.checked = false;

        this.updateSpeakersListDisplay();
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
        // Don't show confirmation if current list is empty
        if (this.currentListType !== type && this.speakersList.length > 0) {
            this.showPopup({
                title: 'Change List Type',
                message: `Are you sure you want to change to ${type}? This will clear the current speakers list.`,
                type: 'info',
                confirmText: 'Change',
                onConfirm: () => {
                    this.updateListType(type);
                }
            });
        } else {
            this.updateListType(type);
        }
    }

    updateListType(type) {
        this.currentListType = type;
        this.currentListTypeDisplay.textContent = type;
        this.speakersList = [];
        this.updateSpeakersListDisplay();
        this.updateListTypeButtons();
        
        // Show/hide caucus settings based on list type
        if (type === 'Moderated Caucus' || type === 'Unmoderated Caucus') {
            this.caucusSettingsElement.classList.remove('hidden');
            this.addToListBtn.textContent = type === 'Unmoderated Caucus' ? 'Start Unmod' : 'Add to List';
        } else {
            this.caucusSettingsElement.classList.add('hidden');
            this.addToListBtn.textContent = 'Add to List';
        }
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
        const absentDelegates = this.delegates.filter(delegate => !this.presentDelegates.includes(delegate.name));
        
        // Filter selected delegates to only include those who are absent
        const delegatesToMarkPresent = selectedDelegates.filter(delegate => absentDelegates.map(d => d.name).includes(delegate));

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

    updatePresentCount() {
        this.presentCount = this.presentDelegates.length;
        this.updateDisplay();
    }

    handleFileLoad(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const session = JSON.parse(e.target.result);
                
                // Validate session data
                if (!this.validateSessionData(session)) {
                    throw new Error('Invalid session data');
                }

                // Normalize session data
                const normalizedSession = this.normalizeSessionData(session);

                // Load the session
                this.loadSession(normalizedSession);
                
                // Add to recent sessions if not already present
                this.saveRecentSession(normalizedSession);

                // Show success message
                this.showPopup({
                    title: 'Session Loaded',
                    message: `Successfully loaded session for ${normalizedSession.committee}`,
                    type: 'success',
                    showCancel: false
                });
            } catch (error) {
                console.error('Session loading error:', error);
                this.showPopup({
                    title: 'Error Loading File',
                    message: 'Unable to load the session file. Please ensure it is a valid DDCMUN session file.',
                    type: 'error',
                    showCancel: false
                });
            }
        };

        reader.onerror = (error) => {
            console.error('File reading error:', error);
            this.showPopup({
                title: 'File Reading Error',
                message: 'There was an error reading the file. Please try again.',
                type: 'error',
                showCancel: false
            });
        };

        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    }

    validateSessionData(session) {
        // Check for required fields
        const requiredFields = [
            'committee', 
            'topic', 
            'delegates', 
            'created'
        ];

        for (let field of requiredFields) {
            if (!session[field]) {
                console.error(`Missing required field: ${field}`);
                return false;
            }
        }

        // Validate delegates
        if (!Array.isArray(session.delegates) || session.delegates.length === 0) {
            console.error('Invalid delegates data');
            return false;
        }

        return true;
    }

    normalizeSessionData(session) {
        // Ensure consistent data structure
        const normalizedSession = {
            committee: session.committee,
            topic: session.topic,
            delegates: session.delegates.map(delegate => 
                typeof delegate === 'string' 
                    ? { name: delegate, absent: false } 
                    : (delegate.name ? delegate : { name: delegate, absent: false })
            ),
            presentDelegates: session.presentDelegates || 
                (session.delegates.map(d => typeof d === 'string' ? d : d.name)),
            speakersList: session.speakersList || [],
            currentListType: session.currentListType || 'None',
            created: session.created || new Date().toISOString()
        };

        return normalizedSession;
    }

    loadSession(session) {
        if (!session) {
            console.error('Attempted to load null session');
            return;
        }

        try {
            // Set session data
            this.currentSession = session;
            this.committee = session.committee;
            this.topic = session.topic;
            this.delegates = session.delegates || [];
            this.presentDelegates = session.presentDelegates || 
                this.delegates.map(d => d.name);
            this.speakersList = session.speakersList || [];
            this.currentListType = session.currentListType || 'None';
            
            // Update UI elements
            if (this.committeeDisplay) {
                this.committeeDisplay.textContent = this.committee;
            }
            if (this.topicDisplay) {
                this.topicDisplay.textContent = this.topic;
            }
            if (this.currentListTypeDisplay) {
                this.currentListTypeDisplay.textContent = this.currentListType;
            }

            // Update various components
            this.updateDisplay();
            this.updatePresentDelegatesList();
            this.updateSpeakersListDisplay();
            this.updateListTypeButtons();
            this.updatePresentCount();

            // Show session page
            this.showSessionPage();

        } catch (error) {
            console.error('Error loading session:', error);
            this.showPopup({
                title: 'Session Load Error',
                message: 'There was a problem loading the session. Some data may be incomplete.',
                type: 'error',
                showCancel: false
            });
        }
    }

    saveSessionToFile() {
        if (!this.currentSession) {
            this.showPopup({
                title: 'No Active Session',
                message: 'Please create or load a session first.',
                type: 'error',
                showCancel: false
            });
            return;
        }

        // Prepare session data for saving
        const sessionData = {
            committee: this.committeeDisplay.textContent,
            topic: this.topicDisplay.textContent,
            delegates: this.delegates,
            speakersList: this.speakersList,
            currentListType: this.currentListType,
            presentDelegates: this.delegates.filter(d => !d.absent).map(d => d.name),
            created: new Date().toISOString()
        };

        // Create blob and download
        const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Create filename from committee name and date
        const safeCommitteeName = this.committee
            .replace(/[^a-z0-9]/gi, '_')
            .toLowerCase()
            .substring(0, 50);
        const dateString = new Date().toISOString().split('T')[0];
        
        a.download = `${safeCommitteeName}_${dateString}.ddcmun`;
        
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.showPopup({
            title: 'Session Saved',
            message: `Session for ${this.committee} has been saved.`,
            type: 'success',
            showCancel: false
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.ddcmun = new DDCMUNManager();
});
