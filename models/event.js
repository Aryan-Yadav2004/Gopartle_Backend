import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        enum: ["Anniversary Celebration", "Art Exhibition", "Award Ceremony", "Birthday Party", "Community Festival", "Concert", "Conference", "Corporate Retreat", "Fundraiser", "Hackathon", "Music Festival", "Networking Event", "Product Launch", "Reunion", "Seminar", "Sporting Event", "Theater Production", "Trade Show / Expo", "Wedding", "Workshop"],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventDate: {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    location: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        default: ''
    },

    hiringCategory: { 
        type: String, 
        enum: ['Planner', 'Performer', 'Crew'], 
        required: true 
    },

    plannerDetails: {
        servicesRequired: {
            type: [String],
            enum: [  "Audio/Visual & Lighting",  "Catering & Menu Planning",  "Decor & Floral Design",  "Entertainment Booking",  "Guest Management & Ticketing",  "Logistics & On-site Coordination",  "Marketing & Promotion",  "Permits & Security",  "Transportation & Parking",  "Venue Sourcing & Booking"],
        },
        estimatedBudget: {
            type: Number,
            min: 0
        },
        guestCount: {
            type: Number,
            min: 0
        },
        default: {}
    },
    performerDetails: {
        actType: {
            type: String,
            enum: ["Band", "DJ", "Dancer", "Magician", "Comedian", "Speaker"]
        },
        durationNeeded: {
            type: Number,
            min: 0
        },
        estimatedBudget: {
            type: Number,
            min: 0
        },
        equipmentProvided: [String],
        default: {}
    },
    crewDetails: {
        crewRole: {
            type: String,
            enum: ["Audio Technician", "Lighting Technician", "Stage Manager", "Security Personnel", "Catering Staff", "Logistics Coordinator"]
        },
        shiftHours: {
            type: Number,
            min: 0
        },
        experienceRequired: String,
        estimatedBudget: {
            type: Number,
            min: 0
        },
        estimatedNumberOfCrew: {
            type: Number,
            min: 1
        },
        default: {}
    }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;