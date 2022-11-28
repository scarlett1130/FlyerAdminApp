export const getRecipientsSummary = (item) => {
    let recipients = [];

    if (item && item.recipients && item.recipients.units && item.recipients.units.data) {
        item.recipients.units.data.map(recipient => {
            if (recipient.unit_self === 'District') {
                let recipientName = recipient.name;
                // let recipientName = data.recipients.units.data[i].first_name + ' ' + data.recipients.units.data[i].last_name;
                recipients.push(recipientName);
            }
        })
    }

    // console.log(recipients);

    if (item && item.recipients && item.recipients.units && item.recipients.units.data && recipients.length < 5) {
        item.recipients.units.data.map(recipient => {
            if (recipient.unit_self === 'School') {
                let recipientName = recipient.name;
                // let recipientName = data.recipients.units.data[i].first_name + ' ' + data.recipients.units.data[i].last_name;
                recipients.push(recipientName);
            }
        })
    }

    // console.log(recipients);


    if (item && item.recipients && item.recipients.units && item.recipients.units.data && recipients.length < 5) {
        item.recipients.units.data.map(recipient => {
            if (recipient.unit_self === 'Group') {
                let recipientName = recipient.name;
                // let recipientName = data.recipients.units.data[i].first_name + ' ' + data.recipients.units.data[i].last_name;
                recipients.push(recipientName);
            }
        })
    }

    // console.log(recipients);


    if (item && item.recipients && item.recipients.users && item.recipients.users.data && recipients.length < 5) {
        item.recipients.users.data.map(user => {
            let recipientName = user.first_name + ' ' + user.last_name;
            recipients.push(recipientName);
        })
    }

    // console.log(recipients);


    return recipients.slice(0,5).join(', ');
};
