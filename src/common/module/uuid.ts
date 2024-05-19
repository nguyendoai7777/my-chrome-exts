export default function () {
	return crypto.randomUUID().replaceAll('-', '');
}
