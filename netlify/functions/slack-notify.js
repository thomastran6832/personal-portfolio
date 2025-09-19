// Netlify Function to send Slack notifications
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { fullname, email, message } = JSON.parse(event.body);

    // Validate required fields
    if (!fullname || !message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Name and message are required' })
      };
    }

    const webhookURL = process.env.SLACK_WEBHOOK_URL;

    if (!webhookURL) {
      console.error('SLACK_WEBHOOK_URL not configured');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Slack webhook not configured' })
      };
    }

    // Create Slack message with blocks format
    const slackMessage = {
      text: "🔔 New Portfolio Contact Form Submission",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "🔔 *New Portfolio Contact Form Submission*"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*👤 Name:*\n${fullname}`
            },
            {
              type: "mrkdwn",
              text: `*📧 Email:*\n${email || "Not provided"}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*💬 Message:*\n${message}`
          }
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `⏰ Received: ${new Date().toLocaleString()}`
            }
          ]
        }
      ]
    };

    // Send to Slack
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage)
    });

    if (response.ok) {
      const responseText = await response.text();
      if (responseText === 'ok') {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
          body: JSON.stringify({ success: true, message: 'Slack notification sent' })
        };
      } else {
        console.error('Slack webhook unexpected response:', responseText);
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
          body: JSON.stringify({ error: `Slack response: ${responseText}` })
        };
      }
    } else {
      const errorText = await response.text();
      console.error('Slack webhook error:', response.status, errorText);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: `Slack webhook failed: ${errorText}` })
      };
    }

  } catch (error) {
    console.error('Netlify function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};