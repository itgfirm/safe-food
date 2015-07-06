[<-- Back to the Evidence Listing](https://github.com/itgfirm/safe-food/edit/master/Evidence)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Next Evidence (i) -->](https://github.com/itgfirm/safe-food/edit/master/Evidence/i)

***h. set up or used continuous monitoring***

**Continuous monitoring is a risk management approach to cybersecurity that maintains an accurate picture of an agency’s security risk posture, provides visibility into assets, and leverages use of automated data feeds to quantify risk, ensure effectiveness of security controls, and implement prioritized remedies. A well-designed and well-managed continuous monitoring program can effectively transform an otherwise static security control assessment and risk determination process into a dynamic process that provides essential, near real-time security status.**

## Risk Management

ITG federal clients benefit from our proactive and extensive approach to continuous monitoring. Given our experience in delivering FISMA compliant systems at GSA and other agencies, we are familiar with the continuous diagnostics & mitigation (CDM) activities necessary to support security operations. 

Our approach is to evaluate every component of the system, prior to implementation, to identify risks nad determine acceptability. Then, once approved, all components must be continuously monitored to ensure the approved level of security is maintained.  

ITG selected Heroku understading that the risk tolerance defined by our Product Owner. We inherited several components of continuous monitoring from Heroku with the understanding that the technology utilized could be swapped out easily should additional risks be identified by the government. As with all systems, the nature of the data and the integrations, as identified by the appropriate privacy or legal officer, is critical in determining the level of security requirements for a system.

## Operational Visibility
ITG leveraged the AWS FedRAMP package and inherited its core infrastructure components within a shared resposibility model since Heroku is deployed in the AWS environment. However, ITG understands that Heroku does not currently hold a FedRAMP ATO and that controls inhereted from Heroku would have to be assessed to meet federal and agency policy and requirements.

### Log Retention and Monitoring
ITG utilized Papertrail to capture, store, and access all logs from our application and the Heroku hosting environment.  From these logs we can perform exploratory searches, define alerts based on saved searches, and also perform foresnic investigations after a security incident.

![image of papertrail](papertrail_logs.png)

### Inherited Controls from Heroku
The Safe Food application inherits all of the security controls for the Heroku management applications, networking, OS, and Node.js frameworks by virtue of being hosted by Heroku.  Moreover, Heroku inherits the security controls from Amazon for their data centers, physical security, and several other areas.  Security is a focal point and penetration testing and vulnerability assessments are performed regularly as well as configuration and vulnerability management.  Heroku publishes a more detailed explaination of their [Security Controls](https://www.heroku.com/policy/security)

Heroku is a PaaS built on the container concept where they can very easily keep the various parts of their stack up to date with minimal impact to the applications running on top of the stack.  To do this Heroku forces a restart of each container (dyno) at least once a day.  This process provides [Erosion Resistance] (https://devcenter.heroku.com/articles/erosion-resistance) by providing a mechnism for their engineers to push out patches and configuration updates to the OS and other key software in the Cedar-14 stack, with no actions required by application teams (i.e. their customers).

#### Active Monitoring from Heroku
Beyond these controls, ITG, as the application developers and owners are  responsible for identifying Heroku incidents and taking recommended actions where prescribed.  We do this by being cognizant of the [Heroku Status](https://status.heroku.com) and more importantly subscribing to receive alerts about incidents.

#### Incident RSS Feed
Our team subscribed our Slack channel to Heroku's [incident RSS feed](https://status.heroku.com/feed) so we are alerted about every platform issue and security incident.

![Image of Heroku Status Page](heroku_status.png)

#### Incident Reports
In addition to the current status, the security incident reports from Heroku typically describe the issue, the steps taken by Heroku to remediate, and any actions required by the application developers.  [Here is an example](heroku_sample_incident.png). Our team has a simple protocol in place for dealing with these as they may come up:

1. Create a new Issue in JIRA and assign it to Project Architect
2. Architect reviews for impact and remediation plan
3. Architect closes or assigns ticket as appropriate

##Change Control
Since the application is currently configured for continuous deployment, it is simply an exercise in re-running the build for the application if an environment has been compromised or must be restored as part of an CP/DR effort. Alternatively we can "roll-back" to a previous version of the code or configurations if an error was introduced. By using github, we are ensured to have an auditable and durable source for our application's source.

### Active Monitoring of Application Code and Associated Risks
Additional security controls we provide are with the application code itself, including storing credentials, maintaining access controls for who can make modifications to the application. We are also response for monitoring and taking any required actions for security vulnerabilities discovered in the open source technologies that we are leveraging for our application. In addition to watching [US-CERT](https://www.us-cert.gov/ncas/alerts), we run an application called [requireSafe](https://requiresafe.com/) that scans Node modules for know vulnerabilities.

![requiresafe output image](requireSafe.png)

This current output shows a vulnerabilty that is not yet mitigated, however a JIRA tracking issue was created (ADSBPA-72) and can be linked to the System POA&M to track all risks associated to the application.

![Jira ADSBPA-72 image](jira_security_issue.png)

## ITG's Security as a Service
Internally ITG's security team is subscribed to US-CERT among other reputable sources.  As necessary the security team sends out action items via JIRA Issues to those ITG stakeholders who may be impacted by the disclosures. These actions must be reviewed and resolved by each of the project leads, ensuring vulnerabilities are known and dealt with appropriately and in a timely manner. The Safe Food application has been added to the list of projects that receive these alerts.

For other projects, ITG performs necessary continuous monitoring scanning of software and environments using various tools (Fortify SSC/SCA, NESSUS, etc.) to ensure vulnerabilities and configurations are accounted for to maintain a functional, yet secure, environment.  Given the current scope of the project, the technologies used and hosting environments chosen, the mentioned scans were not performed, but could be added as required by the security posture.

[<-- Back to the Evidence Listing](https://github.com/itgfirm/safe-food/edit/master/Evidence)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Next Evidence (i) -->](https://github.com/itgfirm/safe-food/edit/master/Evidence/i)
