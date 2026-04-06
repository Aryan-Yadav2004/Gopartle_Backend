function validateEventData(req, res, next) {

    const eventData = req.body;


    if( !eventData.eventName || !eventData.eventDate || !eventData.hiringCategory || !eventData.location || !eventData.eventType || !eventData.eventDate.startDate || !eventData.eventDate.endDate ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    let validatedEventData = {};

    if(eventData.hiringCategory === 'Planner' || eventData.plannerDetails || eventData.plannerDetails.servicesRequired || eventData.plannerDetails.estimatedBudget || eventData.plannerDetails.guestCount) {

      validatedEventData = {...eventData, performerDetails: {}, crewDetails: {}};

    } else if(eventData.hiringCategory === 'Performer' || eventData.performerDetails || eventData.performerDetails.actType || eventData.performerDetails.durationNeeded || eventData.performerDetails.estimatedBudget ) {

      validatedEventData = {...eventData, plannerDetails: {}, crewDetails: {}};

    } else if(eventData.hiringCategory === 'Crew' || eventData.crewDetails || eventData.crewDetails.crewRole || eventData.crewDetails.shiftHours || eventData.crewDetails.estimatedBudget || eventData.crewDetails.estimatedNumberOfCrew) {

      validatedEventData = {...eventData, plannerDetails: {}, performerDetails: {}};

    } else {
      return res.status(400).json({ error: 'Invalid event type or event details.' });
    }

    req.body = validatedEventData;
    next();
}

export { validateEventData };